package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.File;
import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.repository.FileRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.FishRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderFishInfoRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FishServiceImpl implements IFishService {
    private final FishRepository fishRepository;
    private final FileRepository fileRepository;
    private final OrderRepository orderRepository;
    private final IFileService fileService;

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

    @Override
    public boolean createFishByOrderId(OrderFishInfoRequestDTO request) throws IOException {
        try {
            Fish newFish = new Fish();
            File uploadedFile = fileService.uploadFileToFileSystem(request.getFishImage());
            Optional<Order> foundedOrder = orderRepository.findById(request.getOrderId());
            newFish.setName(request.getFishName());
            newFish.setOrder(foundedOrder.get());
            newFish.setPrice(request.getFishPrice());
            newFish.setFile(uploadedFile);
            newFish.setAge(request.getFishAge());
            newFish.setSize(request.getFishSize());
            newFish.setWeight(request.getFishWeight());
            newFish.setLicenses(null);
            fishRepository.save(newFish);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
}
