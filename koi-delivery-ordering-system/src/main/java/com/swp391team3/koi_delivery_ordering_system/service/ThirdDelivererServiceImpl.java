package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDeliverer;
import com.swp391team3.koi_delivery_ordering_system.repository.ThirdDelivererRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ThirdDelivererServiceImpl implements IThirdDelivererService {
    private final ThirdDelivererRepository thirdDelivererRepository;

    @Override
    public ThirdDeliverer createThirdDeliverer(ThirdDeliverer thirdDeliverer) {
        return thirdDelivererRepository.save(thirdDeliverer);
    }

    @Override
    public List<ThirdDeliverer> getAllThirdDeliverers() {
        return thirdDelivererRepository.findAll();
    }

    @Override
    public Optional<ThirdDeliverer> getThirdDelivererById(Long id) {
        return thirdDelivererRepository.findById(id);
    }

    @Override
    public ThirdDeliverer updateThirdDelivererById(Long id, ThirdDeliverer updatedThirdDeliverer) {
        return thirdDelivererRepository.updateThirdDelivererById(id, updatedThirdDeliverer.getName(), updatedThirdDeliverer.getDeliveredType(), updatedThirdDeliverer.getPriceRate());
    }

    @Override
    public void deleteThirdDelivererById(Long id) {
        thirdDelivererRepository.deleteById(id);
    }
}
