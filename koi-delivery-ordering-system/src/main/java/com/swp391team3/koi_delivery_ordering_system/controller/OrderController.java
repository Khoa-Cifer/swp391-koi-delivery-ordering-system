package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.requestDto.FinishOrderUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderSalesStaffCheckingRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IOrderService;
import com.swp391team3.koi_delivery_ordering_system.utils.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;
    private final OrderStatus orderStatus;

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

    @PostMapping("/updateOrderStatus/{id}/{status}")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @PathVariable int status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }

    @PutMapping("/updateOrderSales")
    public ResponseEntity<?> updateOrderSalesAction(@RequestBody OrderSalesStaffCheckingRequestDTO request) {
        return ResponseEntity.ok(orderService.updateOrderSalesAction(request.getOrderId(), request.getSalesId(), request.getActionStatus()));
    }

    @GetMapping("/recommendOrdersForDelivery/{deliveryStaffId}")
    public ResponseEntity<?> recommendOrdersForDelivery(@PathVariable Long deliveryStaffId) {
        return ResponseEntity.ok(orderService.findOrdersForDelivery(deliveryStaffId));
    }

    @GetMapping("/onGoingOrder/{deliveryStaffId}/{deliveryProcessType}")
    public ResponseEntity<?> onGoingOrdersForDelivery(@PathVariable Long deliveryStaffId, @PathVariable int deliveryProcessType) {
        return ResponseEntity.ok(orderService.onGoingOrdersForDelivery(deliveryStaffId, deliveryProcessType));
    }

    @GetMapping("/searchOrderByTrackingId/{trackingId}")
    public ResponseEntity<?> getOrderByTrackingId(@PathVariable String trackingId) {
        return ResponseEntity.ok(orderService.getOrderByTrackingId(trackingId));
    }

    @PutMapping("/finishOrder")
    public ResponseEntity<?> finishOrder(@RequestBody FinishOrderUpdateRequestDTO request) {
        return ResponseEntity.ok(orderService.finishOrder(request));
    }
    @PostMapping(value = "/editOrder/{id}")
    public ResponseEntity<?> editOrder(@PathVariable("id") Long orderId,
                                       @RequestParam(name = "name") String name,
                                       @RequestParam(name = "description") String description,
                                       @RequestParam(name = "expectedFinishDate")@DateTimeFormat(pattern = "yyyy-MM-dd") Date expectedFinishDate,
                                       @RequestParam(name = "destinationAddress") String destinationAddress,
                                       @RequestParam(name = "destinationLongitude") String destinationLongitude,
                                       @RequestParam(name = "destinationLatitude") String destinationLatitude,
                                       @RequestParam(name = "senderAddress") String senderAddress,
                                       @RequestParam(name = "senderLongitude") String senderLongitude,
                                       @RequestParam(name = "senderLatitude") String senderLatitude) {

        Optional<Order> optionalOrder = orderService.getOrderById(orderId);

        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();

            if (order.getOrderStatus() == orderStatus.DRAFT || order.getOrderStatus() == orderStatus.POSTED) {

                Order updatedOrder = orderService.updateOrder(orderId, name, description, expectedFinishDate, destinationAddress, destinationLongitude
                , destinationLatitude, senderAddress, senderLongitude, senderLatitude);
                return ResponseEntity.ok(updatedOrder);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot edit order with status other than DRAFT or POSTED");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The order does not exist");
        }
    }


}
