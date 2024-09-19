package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDeliverer;
import com.swp391team3.koi_delivery_ordering_system.service.IThirdDelivererService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/third-deliverers")
@RequiredArgsConstructor
public class ThirdDelivererController {
    private final IThirdDelivererService thirdDelivererService;

    @PostMapping
    public ResponseEntity<ThirdDeliverer> createThirdDeliverer(@RequestBody ThirdDeliverer thirdDeliverer) {
        ThirdDeliverer createdThirdDeliverer = thirdDelivererService.createThirdDeliverer(thirdDeliverer);
        return ResponseEntity.ok(createdThirdDeliverer);
    }

    @GetMapping
    public ResponseEntity<List<ThirdDeliverer>> getAllThirdDeliverers() {
        List<ThirdDeliverer> thirdDeliverers = thirdDelivererService.getAllThirdDeliverers();
        return ResponseEntity.ok(thirdDeliverers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ThirdDeliverer> getThirdDelivererById(@PathVariable Long id) {
        Optional<ThirdDeliverer> thirdDeliverer = thirdDelivererService.getThirdDelivererById(id);
        return thirdDeliverer.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ThirdDeliverer> updateThirdDelivererById(@PathVariable Long id, @RequestBody ThirdDeliverer thirdDeliverer) {
        ThirdDeliverer updatedThirdDeliverer = thirdDelivererService.updateThirdDelivererById(id, thirdDeliverer);
        return ResponseEntity.ok(updatedThirdDeliverer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteThirdDelivererById(@PathVariable Long id) {
        thirdDelivererService.deleteThirdDelivererById(id);
        return ResponseEntity.noContent().build();
    }
}
