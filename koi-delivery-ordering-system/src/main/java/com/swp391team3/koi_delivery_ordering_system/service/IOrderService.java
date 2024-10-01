package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderFishInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface IOrderService {
    public Long createGeneralInfoOrder(OrderGeneralInfoRequestDTO dto);
    public List<Order> getAllOrders();
    public Optional<Order> getOrderById(Long id);
    public void deleteOrderById(Long id);
}
