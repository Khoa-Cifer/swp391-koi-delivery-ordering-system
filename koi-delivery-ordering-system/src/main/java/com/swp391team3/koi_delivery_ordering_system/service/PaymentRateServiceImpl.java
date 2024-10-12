package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.PaymentService;
import com.swp391team3.koi_delivery_ordering_system.repository.PaymentServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentRateServiceImpl implements IPaymentRateService {
    private final PaymentServiceRepository paymentServiceRepository;

    @Override
    public List<PaymentService> getAllPaymentInfo() {
        return paymentServiceRepository.findAll();
    }

    @Override
    public boolean updatePaymentServiceRate(Long id, double rate) {
        Optional<PaymentService> foundPaymentService = getPaymentServiceById(id);
        if (foundPaymentService.isPresent() && rate > 0) {
            foundPaymentService.get().setRate(rate);
            paymentServiceRepository.save(foundPaymentService.get());
            return true;
        }
        return false;
    }

    @Override
    public Optional<PaymentService> getPaymentServiceById(Long id) {
        return paymentServiceRepository.findById(id);
    }
}
