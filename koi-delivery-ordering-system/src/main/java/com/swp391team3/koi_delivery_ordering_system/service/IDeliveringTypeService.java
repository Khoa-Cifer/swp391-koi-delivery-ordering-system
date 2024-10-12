package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveringType;

import java.util.List;
import java.util.Optional;

public interface IDeliveringTypeService {
    List<DeliveringType> getAllDeliveringTypes();
    Optional<DeliveringType> getDeliveringTypeById(Long id);
    boolean addDeliveringType(String name, String description);
    DeliveringType updateDeliveringType(Long id, String name, String description);
    void deleteDeliveringType(Long id);
}
