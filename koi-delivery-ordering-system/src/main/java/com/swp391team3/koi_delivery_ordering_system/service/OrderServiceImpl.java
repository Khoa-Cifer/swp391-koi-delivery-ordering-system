package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {
    private final OrderRepository orderRepository;

    @Override
    public Order createOrder(String trackingId, String name, String orderStatus, String description, Date createdDate, Date last, Customer customer, DeliveryStaff driver, SalesStaff sales, DeliveringType deliveringType, double price) {
        Order order = new Order();
        order.setTrackingId(trackingId);
        order.setName(name);
        order.setOrderStatus(orderStatus);
        order.setDescription(description);
        order.setCreatedDate(createdDate);
        order.setLastUpdatedDate(last);
        order.setCustomer(customer);
        order.setDriver(driver);
        order.setSales(sales);
        order.setDeliveringType(deliveringType);
        order.setPrice(price);

        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }
}
