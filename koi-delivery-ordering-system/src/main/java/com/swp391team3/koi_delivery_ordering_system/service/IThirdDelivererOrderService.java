package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDelivererOrder;

import java.util.List;
import java.util.Optional;

public interface IThirdDelivererOrderService {
    ThirdDelivererOrder createThirdDelivererOrder(ThirdDelivererOrder thirdDelivererOrder);
    List<ThirdDelivererOrder> getAllThirdDelivererOrders();
    Optional<ThirdDelivererOrder> getThirdDelivererOrderById(Long id);
    ThirdDelivererOrder updateById(Long id, ThirdDelivererOrder thirdDelivererOrder);
    void deleteThirdDelivererOrderById(Long id);
}
