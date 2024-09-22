package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import com.swp391team3.koi_delivery_ordering_system.repository.FishRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FishServiceImpl implements IFishService {
    private final FishRepository fishRepository;

    @Override
    public List<Fish> getAllFishs() {
        return fishRepository.findAll();
    }

    @Override
    public Optional<Fish> getFishById(Long id) {
        return fishRepository.findById(id);
    }

    @Override
    public void deleteFishById(Long id) {
        fishRepository.deleteById(id);
    }
}
