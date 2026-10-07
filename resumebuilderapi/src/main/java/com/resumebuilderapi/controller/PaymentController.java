package com.resumebuilderapi.controller;

import com.resumebuilderapi.document.Payment;
import com.resumebuilderapi.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.resumebuilderapi.util.AppConstants.PREMIUM;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
@Slf4j
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, String> request, Authentication authentication) {
        // step 1: validation for plantype
        String planType = request.get("planType");
        if (!PREMIUM.equalsIgnoreCase(planType)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid planType"));
        }
        // step 2: call the service method
        Payment payment = paymentService.createOrder(authentication.getPrincipal(), planType);
        return ResponseEntity.ok(paymentService.buildCheckoutResponse(payment));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> request) {
        Payment payment = paymentService.verifyPayment(request);
        return ResponseEntity.ok(Map.of(
                "success", "PAID".equals(payment.getStatus()),
                "orderId", payment.getEsewaOrderId(),
                "status", payment.getStatus(),
                "planType", payment.getPlanType()
        ));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyPaymentRedirect(@RequestParam Map<String, String> request) {
        Payment payment = paymentService.verifyPayment(request);
        return ResponseEntity.ok(Map.of(
                "success", "PAID".equals(payment.getStatus()),
                "orderId", payment.getEsewaOrderId(),
                "status", payment.getStatus(),
                "message", "Payment verified successfully"
        ));
    }

    @GetMapping("/failure")
    public ResponseEntity<?> paymentFailure(@RequestParam(name = "transaction_uuid", required = false) String orderId) {
        if (orderId == null || orderId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Payment failed"));
        }

        Payment payment = paymentService.markFailed(orderId);
        return ResponseEntity.badRequest().body(Map.of(
                "message", "Payment failed",
                "orderId", payment.getEsewaOrderId(),
                "status", payment.getStatus()
        ));
    }

    @GetMapping("/history")
    public ResponseEntity<?> getPaymentHistory(Authentication authentication) {
        return ResponseEntity.ok(paymentService.getPaymentHistory(authentication.getPrincipal()));
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getOrderDetails(@PathVariable String orderId, Authentication authentication){
        return ResponseEntity.ok(paymentService.getOrderDetails(orderId, authentication.getPrincipal()));
    }

}
