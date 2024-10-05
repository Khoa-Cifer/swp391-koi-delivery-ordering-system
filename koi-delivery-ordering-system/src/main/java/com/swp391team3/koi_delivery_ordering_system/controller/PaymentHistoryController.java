package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.service.IPaymentHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("api/payment-history")
@RequiredArgsConstructor
public class PaymentHistoryController {
    private final IPaymentHistoryService paymentHistoryService;

    @PostMapping("/log-transaction/{id}")
    public ResponseEntity<?> logTransaction(
            @RequestParam("customerId") Long customerId,
            @RequestParam("orderId") Long orderId,
            @RequestParam("amount") double amount
    ) {
        return ResponseEntity.ok(paymentHistoryService.logPaymentHistory(amount, orderId, customerId));
    }
}
