package com.resumebuilderapi.controller;

import com.resumebuilderapi.document.Payment;
import com.resumebuilderapi.service.PaymentService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
        String planType = request.get("planType");
        if (!PREMIUM.equalsIgnoreCase(planType)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid planType"));
        }
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

    @PostMapping("/simulate-success")
    public ResponseEntity<?> simulateSuccess(@RequestBody Map<String, String> request, Authentication authentication) {
        String orderId = request.get("orderId");
        if (orderId == null || orderId.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "orderId is required"));
        }
        Payment payment = paymentService.simulateTestPayment(orderId, authentication.getPrincipal());
        return ResponseEntity.ok(Map.of(
                "success", true,
                "orderId", payment.getEsewaOrderId(),
                "status", payment.getStatus(),
                "planType", payment.getPlanType(),
                "message", "Sandbox payment simulated successfully!"
        ));
    }

    @GetMapping("/verify")
    public void verifyPaymentRedirect(@RequestParam Map<String, String> request, HttpServletResponse response) throws IOException {
        try {
            Payment payment = paymentService.verifyPayment(request);
            response.sendRedirect("http://localhost:3000/payment/success?orderId=" + payment.getEsewaOrderId() + "&status=" + payment.getStatus());
        } catch (Exception e) {
            log.error("Payment verification failed on redirect: {}", e.getMessage());
            response.sendRedirect("http://localhost:3000/payment/failure");
        }
    }

    @GetMapping("/failure")
    public void paymentFailure(@RequestParam(name = "transaction_uuid", required = false) String orderId, HttpServletResponse response) throws IOException {
        if (orderId != null && !orderId.isBlank()) {
            paymentService.markFailed(orderId);
        }
        response.sendRedirect("http://localhost:3000/payment/failure" + (orderId != null ? "?transaction_uuid=" + orderId : ""));
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
