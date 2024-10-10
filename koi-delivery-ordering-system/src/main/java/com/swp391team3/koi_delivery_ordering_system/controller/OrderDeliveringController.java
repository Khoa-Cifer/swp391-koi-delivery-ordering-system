package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderDeliveringInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderDeliveringUpdateInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IOrderDeliveringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order-delivering")
@RequiredArgsConstructor
public class OrderDeliveringController {
    private final IOrderDeliveringService orderDeliveringService;

    @PostMapping("/createOrderDelivering")
    public ResponseEntity<?> createOrderDeliveringInfo(@RequestBody OrderDeliveringInfoRequestDTO request) {
        boolean createOrderDelivering = orderDeliveringService.startGetting(request.getOrderId(), request.getDeliveryStaffId());
        return ResponseEntity.ok(createOrderDelivering);
    }

    @PutMapping("/updateOrderDeliveringLocation")
    public ResponseEntity<?> updateOrderDeliveringLocation(@RequestBody OrderDeliveringUpdateInfoRequestDTO request) {
        return ResponseEntity.ok(orderDeliveringService.updateDeliveringInfo(request));
    }
}
