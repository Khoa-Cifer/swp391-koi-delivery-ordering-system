package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.requestDto.StorageRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IStorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/storage")
@RequiredArgsConstructor
public class StorageController {
    private final IStorageService storageService;

    @PostMapping("/createStorage")
    public ResponseEntity<?> createStorage(@RequestBody StorageRequestCreationDTO request) {
        return ResponseEntity.ok(storageService.createStorage(request));
    }

    @GetMapping("/getAllStorages")
    public ResponseEntity<?> getAllStorages() {
        return ResponseEntity.ok(storageService.getALlStorages());
    }
}
