package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.requestDto.PaymentRequestDTO;
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

    @PostMapping("/log-payment-history")
    public ResponseEntity<?> logTransaction(@RequestBody PaymentRequestDTO request) {
        return ResponseEntity.ok(paymentHistoryService.logPaymentHistory(request.getAmount(), request.getOrderId(), request.getCustomerId()));
    }

    @GetMapping("/get-payment-history/{id}")
    public ResponseEntity<?> checkTransaction(@PathVariable Long id) {
        return ResponseEntity.ok(paymentHistoryService.getPaymentHistoryById(id).get());
    }

    @GetMapping("/get-all-payment-history")
    public ResponseEntity<?> getAllPaymentHistory() {
        return ResponseEntity.ok(paymentHistoryService.getAllPaymentHistory());
    }
}
