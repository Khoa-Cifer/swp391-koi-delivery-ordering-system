package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
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

    //Get All Delivery Staff
    //PASSED
    @GetMapping("/getAllDeliveryStaff")
    public ResponseEntity<?> getAllDeliveryStaff() {
        return ResponseEntity.ok(deliveryStaffService.getAllDeliveryStaffs());
    }

    //Get Delivery Staff By Id
    //PASSED
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveryStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryStaffService.getDeliveryStaffById(id));
    }

    //Delete Delivery Staff
    //PASSED
    @DeleteMapping("/{id}")
    public void deleteDeliveryStaff(@PathVariable Long id) {
        deliveryStaffService.deleteDeliveryStaffById(id);
    }

    //Update Delivery Staff
    //PASSED
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeliveryStaff(@PathVariable Long id, @RequestBody DeliveryStaff deliveryStaff) {
        return ResponseEntity.ok(deliveryStaffService.updateDeliveryStaffById(id, deliveryStaff.getEmail(), deliveryStaff.getPhoneNumber()));
    }
}
