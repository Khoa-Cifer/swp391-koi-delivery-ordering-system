package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import com.swp391team3.koi_delivery_ordering_system.service.IFishService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/fishes")
@RequiredArgsConstructor
public class FishController {
    private final IFishService fishService;

    @GetMapping("/getAllFishes")
    public List<Fish> getAllFishes() {
        return fishService.getAllFishs();
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
