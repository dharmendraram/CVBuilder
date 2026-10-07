package com.resumebuilderapi.repository;

import com.resumebuilderapi.document.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, String> {
    Optional<Payment> findByEsewaOrderId(String esewaOrderId);

    List<Payment> findByUserIdOrderByCreatedAtDesc(String userId);
}
