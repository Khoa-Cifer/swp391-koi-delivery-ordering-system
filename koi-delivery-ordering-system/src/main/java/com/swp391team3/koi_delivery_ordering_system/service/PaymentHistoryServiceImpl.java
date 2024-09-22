package com.swp391team3.koi_delivery_ordering_system.service;


import com.swp391team3.koi_delivery_ordering_system.model.PaymentHistory;
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
    public List<PaymentHistory> getAllPaymentHistory() {
        return paymentHistoryRepository.findAll();
    }

    @Override
    public Optional<PaymentHistory> getPaymentHistoryById(Long id) {
        return paymentHistoryRepository.findById(id);
    }


    @Override
    public PaymentHistory updatePaymentHistory(Long id,  String description) {
        PaymentHistory paymentHistory = paymentHistoryRepository.findById(id).get();
        if(paymentHistory != null) {
            paymentHistory.setDescription(description);
            return paymentHistoryRepository.save(paymentHistory);
        }
        return null;
    }
}
