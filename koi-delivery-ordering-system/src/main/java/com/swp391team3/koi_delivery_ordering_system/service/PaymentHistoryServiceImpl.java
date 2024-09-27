package com.swp391team3.koi_delivery_ordering_system.service;


import com.swp391team3.koi_delivery_ordering_system.model.OrderPaymentHistory;
import com.swp391team3.koi_delivery_ordering_system.repository.PaymentHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentHistoryServiceImpl implements IPaymentHistoryService {
    private final PaymentHistoryRepository paymentHistoryRepository;

    @Override
    public List<OrderPaymentHistory> getAllPaymentHistory() {
        return paymentHistoryRepository.findAll();
    }

    @Override
    public Optional<OrderPaymentHistory> getPaymentHistoryById(Long id) {
        return paymentHistoryRepository.findById(id);
    }


    @Override
    public OrderPaymentHistory updatePaymentHistory(Long id, String description) {
        OrderPaymentHistory orderPaymentHistory = paymentHistoryRepository.findById(id).get();
        if(orderPaymentHistory != null) {
            orderPaymentHistory.setDescription(description);
            return paymentHistoryRepository.save(orderPaymentHistory);
        }
        return null;
    }
}
