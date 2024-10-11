package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.PaymentService;
import com.swp391team3.koi_delivery_ordering_system.service.IPaymentRateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/payment-service")
@RequiredArgsConstructor
public class PaymentServiceController {
    private final IPaymentRateService paymentRateService;

    @GetMapping("get-all-payment-info")
    public List<PaymentService> getALlPaymentRate() {
        return paymentRateService.getAllPaymentInfo();
    }

    @PutMapping("update-payment-info")
    public boolean updatePaymentServiceRate(@RequestParam Long id, @RequestParam double rate) {
        return paymentRateService.updatePaymentServiceRate(id, rate);
    }
}
