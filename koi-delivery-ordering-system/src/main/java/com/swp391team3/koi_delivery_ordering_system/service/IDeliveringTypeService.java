package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveringType;

import java.util.List;
import java.util.Optional;

public interface IDeliveringTypeService {
    public List<DeliveringType> getAllDeliveringTypes();
    public Optional<DeliveringType> getDeliveringTypeById(Long id);
    public boolean addDeliveringType(String name, String description);
    public DeliveringType updateDeliveringType(Long id, String name, String description);
    public void deleteDeliveringType(Long id);
}
