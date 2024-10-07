package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;

import java.util.List;
import java.util.Optional;

public interface IOrderService {
    public Long createGeneralInfoOrder(OrderGeneralInfoRequestDTO dto);
    public List<Order> getAllOrders();
    public Optional<Order> getOrderById(Long id);
    public void deleteOrderById(Long id);
    public Optional<Order> filterOrderToStorage(Long id);
    public boolean postOrder(Long id);

    public boolean updateOrderStatus(Long id, int status);
    public List<Order> getOrderByStatus(int status);

    public double calculateOrderPrice(Long id);

    public List<Order> findOrdersForDelivery(Long id);
    public void generateOrderDelivering(Order order, DeliveryStaff deliveryStaff);
    public boolean startDelivery(Long id, Long driverId);
}
