package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderFishInfoRequestDTO;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface IFishService {
    List<Fish> getAllFishs();
    Optional<Fish> getFishById(Long id);
    void deleteFishById(Long id);
    Long createFishByOrderId(OrderFishInfoRequestDTO request) throws IOException;
    List<Fish> getFishesByOrderId(Long orderId);
}
