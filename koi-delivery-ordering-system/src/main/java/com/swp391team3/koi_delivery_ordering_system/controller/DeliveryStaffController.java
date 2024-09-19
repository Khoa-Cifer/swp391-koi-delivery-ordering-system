package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/delivery-staff")
@RequiredArgsConstructor
public class DeliveryStaffController {
    private final IDeliveryStaffService deliveryStaffService;

    @PostMapping
    public String createDeliveryStaff(@RequestBody String email, String password, String username, String phoneNumber) {
        String createdStaff = deliveryStaffService.createDeliveryStaff(email, password, username, phoneNumber);
        return createdStaff;
    }

    @GetMapping
    public ResponseEntity<List<DeliveryStaff>> getAllDeliveryStaff() {
        List<DeliveryStaff> staffList = deliveryStaffService.getAllDeliveryStaff();
        return ResponseEntity.ok(staffList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryStaff> getDeliveryStaffById(@PathVariable Long id) {
        Optional<DeliveryStaff> staff = deliveryStaffService.getDeliveryStaffById(id);
        return staff.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DeliveryStaff> updateDeliveryStaffById(@PathVariable Long id, @RequestBody DeliveryStaff deliveryStaff) {
        DeliveryStaff updatedStaff = deliveryStaffService.updateDeliveryStaffById(id, deliveryStaff);
        return ResponseEntity.ok(updatedStaff);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeliveryStaffById(@PathVariable Long id) {
        deliveryStaffService.deleteDeliveryStaffById(id);
        return ResponseEntity.noContent().build();
    }
}
