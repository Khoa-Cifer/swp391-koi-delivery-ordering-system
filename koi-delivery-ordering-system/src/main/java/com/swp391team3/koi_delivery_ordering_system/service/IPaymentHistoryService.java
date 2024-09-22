package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.PaymentHistory;

import java.util.List;
import java.util.Optional;

public interface IPaymentHistoryService {
    public List<PaymentHistory> getAllPaymentHistory();
    public Optional<PaymentHistory> getPaymentHistoryById(Long id);
    public PaymentHistory updatePaymentHistory(Long id, String description);
}
