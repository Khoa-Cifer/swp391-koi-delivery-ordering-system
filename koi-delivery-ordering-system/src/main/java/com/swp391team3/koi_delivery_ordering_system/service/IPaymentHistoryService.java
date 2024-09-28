package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.OrderPaymentHistory;

import java.util.List;
import java.util.Optional;

public interface IPaymentHistoryService {
    public List<OrderPaymentHistory> getAllPaymentHistory();
    public Optional<OrderPaymentHistory> getPaymentHistoryById(Long id);
    public OrderPaymentHistory updatePaymentHistory(Long id, String description);
}
