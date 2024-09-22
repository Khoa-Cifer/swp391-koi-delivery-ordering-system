package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IOrderService {
    public Order createOrder(String trackingId, String name, String orderStatus, String description, Date createdDate, Date last, Customer customer, DeliveryStaff driver, SalesStaff sales, DeliveringType deliveringType, double price);
    public List<Order> getAllOrders();
    public Optional<Order> getOrderById(Long id);
    public void deleteOrderById(Long id);
}
