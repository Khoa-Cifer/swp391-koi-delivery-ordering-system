package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.config.thirdParty.VNPayConfiguration;
import com.swp391team3.koi_delivery_ordering_system.responseDto.PaymentResponseDTO;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

public interface IPaymentService {
    public PaymentResponseDTO createVnPayPayment(HttpServletRequest request);
}
