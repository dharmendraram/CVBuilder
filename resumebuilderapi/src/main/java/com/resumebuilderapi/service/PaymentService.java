package com.resumebuilderapi.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resumebuilderapi.document.Payment;
import com.resumebuilderapi.document.User;
import com.resumebuilderapi.repository.PaymentRepository;
import com.resumebuilderapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
    private static final String CREATED = "CREATED";
    private static final String PAID = "PAID";
    private static final String FAILED = "FAILED";
    private static final String COMPLETE = "COMPLETE";
    private static final String SIGNED_FIELDS = "total_amount,transaction_uuid,product_code";

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    private final HttpClient httpClient = HttpClient.newHttpClient();

    @Value("${esewa.product-code:EPAYTEST}")
    private String esewaProductCode;

    @Value("${esewa.secret-key:8gBm/:&EnhH.1/q(}")
    private String esewaSecretKey;

    @Value("${esewa.payment-url:https://rc-epay.esewa.com.np/api/epay/main/v2/form}")
    private String esewaPaymentUrl;

    @Value("${esewa.status-url:https://uat.esewa.com.np/api/epay/transaction/status/}")
    private String esewaStatusUrl;

    @Value("${esewa.success-url:http://localhost:8080/api/payment/verify}")
    private String esewaSuccessUrl;

    @Value("${esewa.failure-url:http://localhost:8080/api/payment/failure}")
    private String esewaFailureUrl;

    @Value("${premium.plan.amount:1000}")
    private BigDecimal premiumPlanAmount;

    @Transactional
    public Payment createOrder(Object principal, String planType) {
        User user = (User) principal;
        Payment payment = Payment.builder()
                .userId(user.getId())
                .esewaOrderId("PREMIUM-" + UUID.randomUUID())
                .amount(premiumPlanAmount.setScale(2, RoundingMode.HALF_UP))
                .currency("NPR")
                .planType(planType.toLowerCase(Locale.ROOT))
                .status(CREATED)
                .receipt("premium-plan-" + user.getId())
                .build();

        return paymentRepository.save(payment);
    }

    public Map<String, Object> buildCheckoutResponse(Payment payment) {
        Map<String, String> formData = new LinkedHashMap<>();
        formData.put("amount", formatAmount(payment.getAmount()));
        formData.put("tax_amount", "0");
        formData.put("total_amount", formatAmount(payment.getAmount()));
        formData.put("transaction_uuid", payment.getEsewaOrderId());
        formData.put("product_code", esewaProductCode);
        formData.put("product_service_charge", "0");
        formData.put("product_delivery_charge", "0");
        formData.put("success_url", esewaSuccessUrl);
        formData.put("failure_url", esewaFailureUrl);
        formData.put("signed_field_names", SIGNED_FIELDS);
        formData.put("signature", sign(buildSignatureMessage(formData, SIGNED_FIELDS)));

        return Map.of(
                "orderId", payment.getEsewaOrderId(),
                "amount", payment.getAmount(),
                "currency", payment.getCurrency(),
                "receipt", payment.getReceipt(),
                "paymentUrl", esewaPaymentUrl,
                "formData", formData
        );
    }

    @Transactional
    public Payment verifyPayment(Map<String, String> request) {
        Map<String, Object> decodedData = decodeEsewaResponse(request);
        verifyEsewaSignature(decodedData);

        String orderId = valueAsString(decodedData.get("transaction_uuid"));
        Payment payment = paymentRepository.findByEsewaOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment order not found"));

        String totalAmount = valueAsString(decodedData.get("total_amount"));
        if (payment.getAmount().compareTo(new BigDecimal(totalAmount).setScale(2, RoundingMode.HALF_UP)) != 0) {
            throw new RuntimeException("Payment amount does not match order amount");
        }

        String productCode = valueAsString(decodedData.get("product_code"));
        if (!esewaProductCode.equals(productCode)) {
            throw new RuntimeException("Payment product code does not match merchant code");
        }

        String callbackStatus = valueAsString(decodedData.get("status"));
        String gatewayStatus = fetchGatewayStatus(payment);
        if (COMPLETE.equalsIgnoreCase(callbackStatus) && COMPLETE.equalsIgnoreCase(gatewayStatus)) {
            payment.setStatus(PAID);
            payment.setEsewaTransactionCode(valueAsString(decodedData.get("transaction_code")));
            payment.setEsewaSignature(valueAsString(decodedData.get("signature")));
            activatePremiumPlan(payment.getUserId());
        } else {
            payment.setStatus(FAILED);
        }

        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment markFailed(String orderId) {
        Payment payment = paymentRepository.findByEsewaOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment order not found"));
        payment.setStatus(FAILED);
        return paymentRepository.save(payment);
    }

    public List<Payment> getPaymentHistory(Object principal) {
        User user = (User) principal;
        return paymentRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Payment getOrderDetails(String orderId, Object principal) {
        User user = (User) principal;
        Payment payment = paymentRepository.findByEsewaOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment order not found"));

        if (!payment.getUserId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to view this payment order");
        }

        return payment;
    }

    private Map<String, Object> decodeEsewaResponse(Map<String, String> request) {
        try {
            if (request.containsKey("data")) {
                byte[] decoded = Base64.getDecoder().decode(request.get("data"));
                return objectMapper.readValue(decoded, new TypeReference<>() {});
            }

            return new LinkedHashMap<>(request);
        } catch (Exception e) {
            throw new RuntimeException("Invalid eSewa response payload", e);
        }
    }

    private void verifyEsewaSignature(Map<String, Object> decodedData) {
        String signedFieldNames = valueAsString(decodedData.get("signed_field_names"));
        String receivedSignature = valueAsString(decodedData.get("signature"));
        String expectedSignature = sign(buildSignatureMessage(decodedData, signedFieldNames));

        if (!expectedSignature.equals(receivedSignature)) {
            throw new RuntimeException("Invalid eSewa payment signature");
        }
    }

    private String fetchGatewayStatus(Payment payment) {
        try {
            String url = esewaStatusUrl
                    + "?product_code=" + encode(esewaProductCode)
                    + "&total_amount=" + encode(formatAmount(payment.getAmount()))
                    + "&transaction_uuid=" + encode(payment.getEsewaOrderId());

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .GET()
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                throw new RuntimeException("eSewa status check failed with status " + response.statusCode());
            }

            Map<String, Object> statusResponse = objectMapper.readValue(response.body(), new TypeReference<>() {});
            return valueAsString(statusResponse.get("status"));
        } catch (Exception e) {
            throw new RuntimeException("Unable to verify payment status with eSewa", e);
        }
    }

    private void activatePremiumPlan(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setSubscriptionPlan("premium");
        userRepository.save(user);
    }

    private String buildSignatureMessage(Map<String, ?> data, String signedFieldNames) {
        return List.of(signedFieldNames.split(","))
                .stream()
                .map(field -> field + "=" + valueAsString(data.get(field)))
                .reduce((left, right) -> left + "," + right)
                .orElseThrow(() -> new RuntimeException("Missing signed field names"));
    }

    private String sign(String message) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(esewaSecretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            return Base64.getEncoder().encodeToString(mac.doFinal(message.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("Unable to generate eSewa signature", e);
        }
    }

    private String formatAmount(BigDecimal amount) {
        return amount.setScale(2, RoundingMode.HALF_UP).stripTrailingZeros().toPlainString();
    }

    private String valueAsString(Object value) {
        if (value == null) {
            throw new RuntimeException("Missing required eSewa field");
        }
        return String.valueOf(value).trim();
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }
}
