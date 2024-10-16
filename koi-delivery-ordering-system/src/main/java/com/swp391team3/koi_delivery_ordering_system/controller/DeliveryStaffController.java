package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.requestDto.UserUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.DeliveryStaffLocationUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestUpdateDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/deliveryStaff")
@RequiredArgsConstructor
public class DeliveryStaffController {
    private final IDeliveryStaffService deliveryStaffService;

    @PostMapping("/createDeliveryStaff")
    public ResponseEntity<?> createDeliveryStaff(@RequestBody StaffRequestCreationDTO request) {
        String result = deliveryStaffService.createDeliveryStaff(request.getEmail(), request.getUsername(), request.getPhoneNumber());
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
    @DeleteMapping("/deleteDeliveryStaffById/{id}")
    public void deleteDeliveryStaff(@PathVariable Long id) {
        deliveryStaffService.deleteDeliveryStaffById(id);
    }

    //Update Delivery Staff
    //PASSED
    @PutMapping("/updateDeliveryStaffById/{id}")
    public ResponseEntity<?> updateDeliveryStaff(@PathVariable Long id, @RequestBody StaffRequestUpdateDTO request) {
        return ResponseEntity.ok(deliveryStaffService.updateDeliveryStaffById(id, request.getEmail(), request.getPhoneNumber(), request.getUsername()));
    }
//    @PostMapping("/startDelivery/{id}")
//    public ResponseEntity<?> startDelivery(@PathVariable Long id, @RequestBody Long driverId) {
//        if(orderService.startDelivery(id, driverId)){
//            return ResponseEntity.ok("Delivering order");
//        }
//        return ResponseEntity.badRequest().build();
//    }
//

    @PutMapping("/updateDeliveryStaffLocation")
    public ResponseEntity<?> updateDeliveryStaffLocation(@RequestBody DeliveryStaffLocationUpdateRequestDTO request) {
        return ResponseEntity.ok(deliveryStaffService.updateDeliveryStaffLocation(request));
    }

     @PutMapping("/updateDeliveryStaffProfile")
    public ResponseEntity<?> updateCustomerProfile(@RequestBody UserUpdateRequestDTO request) {
        return ResponseEntity.ok(deliveryStaffService.deliveryStaffUpdateProfile(request));
    }

    @PutMapping("/updateDeliveryStaffAvatar/{id}")
    public ResponseEntity<?> updateCustomerProfileAvatar(
            @PathVariable("id") Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(deliveryStaffService.deliveryStaffUpdateAvatar(id, file));
    }
}
