package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Order;

import java.util.List;
import java.util.Optional;

public interface IOrderService {
    public Order createOrder(Order order);
    public List<Order> getAllOrders();
    public Optional<Order> getOrderById(Long id);
    public void deleteOrderById(Long id);
}
