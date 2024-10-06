package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    //PASS
    @PostMapping("/createOrderGeneralData")
    public ResponseEntity<?> createOrderGeneralInfo(@RequestBody OrderGeneralInfoRequestDTO request) {
        Long createdOrder = orderService.createGeneralInfoOrder(request);
        return ResponseEntity.ok(createdOrder);
    }

    @PostMapping("/postOrder/{id}")
    public ResponseEntity<?> postOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.postOrder(id));
    }

    //Get All Orders
    //PASSED
    @GetMapping("/getAllOrders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/getOrderById/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/deleteOrderById/{id}")
    public ResponseEntity<Void> deleteOrderById(@PathVariable Long id) {
        orderService.deleteOrderById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getOrderByStatus/{status}")
    public ResponseEntity<List<Order>> getOrdersByStatus(@PathVariable int status) {
        List<Order> orders = orderService.getOrderByStatus(status);

        if (orders.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(orders);
        } else {
            return ResponseEntity.ok(orders);
        }
    }

    @PostMapping("/filterOrderDistance/{id}")
    public ResponseEntity<?> filterOrder(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.filterOrderToStorage(id).get());
    }

    @PostMapping("/calculatePrice/{id}")
    public ResponseEntity<?> calculateOrderPrice(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.calculateOrderPrice(id));
    }

    @PostMapping("/updateOrderStatus/{id}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam int status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
