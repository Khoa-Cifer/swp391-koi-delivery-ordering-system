package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDelivererOrder;
import com.swp391team3.koi_delivery_ordering_system.repository.ThirdDelivererOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ThirdDelivererOrderServiceImpl implements IThirdDelivererOrderService {
    private final ThirdDelivererOrderRepository thirdDelivererOrderRepository;

    @Override
    public ThirdDelivererOrder createThirdDelivererOrder(ThirdDelivererOrder thirdDelivererOrder) {
        return thirdDelivererOrderRepository.save(thirdDelivererOrder);
    }

    @Override
    public List<ThirdDelivererOrder> getAllThirdDelivererOrders() {
        return thirdDelivererOrderRepository.findAll();
    }

    @Override
    public Optional<ThirdDelivererOrder> getThirdDelivererOrderById(Long id) {
        return thirdDelivererOrderRepository.findById(id);
    }

    @Override
    public ThirdDelivererOrder updateById(Long id, ThirdDelivererOrder thirdDelivererOrder) {
        return thirdDelivererOrderRepository.updateById(id, thirdDelivererOrder.getDeliverer());
    }

    @Override
    public void deleteThirdDelivererOrderById(Long id) {
        thirdDelivererOrderRepository.deleteById(id);
    }
}
