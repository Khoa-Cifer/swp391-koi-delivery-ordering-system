package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDeliverer;

import java.util.List;
import java.util.Optional;

public interface IThirdDelivererService {
    ThirdDeliverer createThirdDeliverer(ThirdDeliverer thirdDeliverer);
    List<ThirdDeliverer> getAllThirdDeliverers();
    Optional<ThirdDeliverer> getThirdDelivererById(Long id);
    ThirdDeliverer updateThirdDelivererById(Long id, ThirdDeliverer thirdDeliverer);
    void deleteThirdDelivererById(Long id);
}
