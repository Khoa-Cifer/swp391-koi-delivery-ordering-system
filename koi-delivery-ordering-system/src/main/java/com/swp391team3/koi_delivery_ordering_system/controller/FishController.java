package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderFishInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IFishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/fishes")
@RequiredArgsConstructor
public class FishController {
    private final IFishService fishService;

    //Get All Fish
    //
    @GetMapping("/getAllFishes")
    public List<Fish> getAllFishes() {
        return fishService.getAllFishs();
    }

    @PostMapping(value = "/createFishByOrderId", consumes = "multipart/form-data")
    public Long createFishOrder(
            @RequestParam("fishName") String fishName,
            @RequestParam("fishAge") int fishAge,
            @RequestParam("fishSize") double fishSize,
            @RequestParam("fishWeight") double fishWeight,
            @RequestParam("fishPrice") double fishPrice,
            @RequestParam("fishImage") MultipartFile fishImage,
            @RequestParam("orderId") Long orderId) throws IOException {

        // Create a new OrderFishInfoRequestDTO
        OrderFishInfoRequestDTO request = new OrderFishInfoRequestDTO();
        request.setFishName(fishName);
        request.setFishAge(fishAge);
        request.setFishSize(fishSize);
        request.setFishWeight(fishWeight);
        request.setFishPrice(fishPrice);
        request.setFishImage(fishImage);
        request.setOrderId(orderId);
        return fishService.createFishByOrderId(request);
    }

    @GetMapping("/getFishById")
    public Fish getFishById(@RequestParam("id") Long id) {
        return fishService.getFishById(id).get();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFish(@PathVariable("id") Long id) {
        fishService.deleteFishById(id);
    }
}
