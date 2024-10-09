package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.model.OrderDelivering;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderDeliveringInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderDeliveringUpdateInfoRequestDTO;

public interface IOrderDeliveringService {
    public void generateOrderGetting(Order order, DeliveryStaff deliveryStaff);
    public boolean startGetting(Long id, Long driverId);
    public OrderDelivering updateDeliveringInfo(OrderDeliveringUpdateInfoRequestDTO request);
}
