package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.service.ITransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/transaction")
@RequiredArgsConstructor
public class TransactionController {
    private final ITransactionService transactionService;

    // @PostMapping("/log-transaction/{id}")
    // public ResponseEntity<?> logTransaction(
    //         @PathVariable("id") Long id,
    //         @RequestParam("createdDate")Date createdDate,
    //         @RequestParam("amount") double amount
    // ) {
    //     return ResponseEntity.ok(transactionService.createTransaction(id, createdDate, amount));
    // }

    @GetMapping("/get-transactions-by-customer-id/{customerId}")
    public ResponseEntity<?> getTransactionsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(transactionService.getTransactionsByCustomerId(customerId));
    }

    @GetMapping("/get-all-transactions")
    public ResponseEntity<?> getAllTransactions() {
        return ResponseEntity.ok(transactionService.getAllTransactionsHistory());
    }
}
