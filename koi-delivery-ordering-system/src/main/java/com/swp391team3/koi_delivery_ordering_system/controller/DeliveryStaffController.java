package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.DeliveryStaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/deliveryStaff")
@RequiredArgsConstructor
public class DeliveryStaffController {
    private final IDeliveryStaffService deliveryStaffService;

    @PostMapping("/createDeliveryStaff")
    public ResponseEntity<?> createDeliveryStaff(@RequestBody DeliveryStaffRequestCreationDTO request) {
        String result = deliveryStaffService.createDeliveryStaff(request.getEmail(), request.getUsername());
        return ResponseEntity.ok(result);
    }

    //Get All Delivery Staff
    //PASSED
    @GetMapping("/getAllDeliveryStaff")
    public ResponseEntity<?> getAllDeliveryStaff() {
        return ResponseEntity.ok(deliveryStaffService.getAllDeliveryStaffs());
    }

    //Get Delivery Staff By Id
    //PASSED
    @GetMapping("/getDeliveryStaffById/{id}")
    public ResponseEntity<?> getDeliveryStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryStaffService.getDeliveryStaffById(id));
    }

    //Delete Delivery Staff
    //PASSED
    @DeleteMapping("/updateDeliveryStaffById/{id}")
    public void deleteDeliveryStaff(@PathVariable Long id) {
        deliveryStaffService.deleteDeliveryStaffById(id);
    }

    //Update Delivery Staff
    //PASSED
    @PutMapping("/deleteDeliveryStaffById/{id}")
    public ResponseEntity<?> updateDeliveryStaff(@PathVariable Long id, @RequestBody DeliveryStaff deliveryStaff) {
        return ResponseEntity.ok(deliveryStaffService.updateDeliveryStaffById(id, deliveryStaff.getEmail(), deliveryStaff.getPhoneNumber()));
    }
}
