package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveringType;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveringTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class DeliveringTypeServiceImpl implements IDeliveringTypeService{
    private final DeliveringTypeRepository deliveringTypeRepository;
    

    @Override
    public List<DeliveringType> getAllDeliveringTypes() {
        return deliveringTypeRepository.findAll();
    }

    @Override
    public Optional<DeliveringType> getDeliveringTypeById(Long id) {
        return deliveringTypeRepository.findById(id);
    }

    @Override
    public boolean addDeliveringType(String name, String description) {
        try {
            DeliveringType deliveringType = new DeliveringType();
            deliveringType.setName(name);
            deliveringType.setDescription(description);

            deliveringTypeRepository.save(deliveringType);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public DeliveringType updateDeliveringType(Long id, String name, String description) {
        return deliveringTypeRepository.updateDeliveringType(id, name, description);
    }

    @Override
    public void deleteDeliveringType(Long id) {
        deliveringTypeRepository.deleteById(id);
    }
}
