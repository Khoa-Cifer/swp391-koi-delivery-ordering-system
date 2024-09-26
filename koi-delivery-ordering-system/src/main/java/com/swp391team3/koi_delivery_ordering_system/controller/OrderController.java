package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;

    //Create Order
    //
    @PostMapping("/createOrderGeneralData")
    public ResponseEntity<?> createOrderGeneralInfo(@RequestBody OrderGeneralInfoRequestDTO request) {
        Long createdOrder = orderService.createGeneralInfoOrder(request);
        return ResponseEntity.ok(createdOrder);
    }

//    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
//        Order createdOrder = orderService.createOrder(
//                order.getTrackingId(),
//                order.getName(),
//                order.getOrderStatus(),
//                order.getDescription(),
//                order.getCreatedDate(),
//                order.getLastUpdatedDate(),
//                order.getCustomer(),
//                order.getDriver(),
//                order.getSalesStaff(),
//                order.getDeliveringType(),
//                order.getPrice());
//        return ResponseEntity.ok(createdOrder);
//    }

    //Get All Orders
    //PASSED
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return ResponseEntity.noContent().build();
    }
}
