package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/admin/deliveryStaff")
@RequiredArgsConstructor
public class DeliveryStaffController {
    private final IDeliveryStaffService deliveryStaffService;

    @GetMapping("/getAllDeliveryStaff")
    public ResponseEntity<?> getAllDeliveryStaff() {
        return ResponseEntity.ok(deliveryStaffService.getAllDeliveryStaffs());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveryStaffById(@RequestBody long id) {
        return ResponseEntity.ok(deliveryStaffService.getDeliveryStaffById(id));
    }
    @DeleteMapping("/{id}")
    public void setDeliveryStaffService(@RequestBody long id) {
        deliveryStaffService.deleteDeliveryStaffById(id);
    }
    @PostMapping("/{id}")
    public ResponseEntity<?> updateDeliveryStaff(@RequestBody long id, @RequestBody String email, String phoneNumber) {
        return ResponseEntity.ok(deliveryStaffService.updateDeliveryStaffById(id, email, phoneNumber));
    }
}
