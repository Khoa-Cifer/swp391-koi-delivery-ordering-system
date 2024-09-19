package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDelivererOrder;
import com.swp391team3.koi_delivery_ordering_system.service.IThirdDelivererOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/third-deliverer-orders")
@RequiredArgsConstructor
public class ThirdDelivererOrderController {
    private final IThirdDelivererOrderService thirdDelivererOrderService;

    @GetMapping
    public ResponseEntity<List<ThirdDelivererOrder>> getAllThirdDelivererOrders() {
        List<ThirdDelivererOrder> orders = thirdDelivererOrderService.getAllThirdDelivererOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThirdDelivererOrder> getThirdDelivererOrderById(@PathVariable Long id) {
        Optional<ThirdDelivererOrder> order = thirdDelivererOrderService.getThirdDelivererOrderById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThirdDelivererOrderById(@PathVariable Long id) {
        thirdDelivererOrderService.deleteThirdDelivererOrderById(id);
        return ResponseEntity.noContent().build();
    }
}
