package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.PaymentHistory;
import com.swp391team3.koi_delivery_ordering_system.service.IPaymentHistoryService;
import com.swp391team3.koi_delivery_ordering_system.service.IPaymentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/payment")
@RequiredArgsConstructor
public class PaymentController {
    private final IPaymentService paymentService;
    private final IPaymentHistoryService paymentHistoryService;

    //Create Payment
    //SKIPPED
    @GetMapping("/vn-pay")
    public ResponseEntity<?> pay(HttpServletRequest request) {
        return new ResponseEntity<>(paymentService.createVnPayPayment(request), HttpStatus.OK);
    }

    //Get All Payment History
    //PASSED
    @GetMapping("/getAllPaymentHistory")
    public ResponseEntity<?> getAllPaymentHistory() {
        return ResponseEntity.ok(paymentHistoryService.getAllPaymentHistory());
    }

    //Get Payment History By Id
    //PASSED
    @GetMapping("/{id}")
    public ResponseEntity<?> getPaymentHistoryById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentHistoryService.getPaymentHistoryById(id));
    }

    //update Payment History
    //PASSED
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePaymentHistory(@PathVariable Long id, @RequestBody PaymentHistory paymentHistory) {
        return ResponseEntity.ok(paymentHistoryService.updatePaymentHistory(id, paymentHistory.getDescription()));
    }
}
