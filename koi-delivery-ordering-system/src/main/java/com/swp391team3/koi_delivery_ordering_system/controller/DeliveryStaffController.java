package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.DeliveryStaffLocationUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestUpdateDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;

import java.io.IOException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

    @PutMapping("/disable/{id}")
    public ResponseEntity<?> disableDeliveryStaffById(@PathVariable Long id) {
        Optional<DeliveryStaff> deliveryStaff = deliveryStaffService.getDeliveryStaffById(id);
        if (deliveryStaff.isPresent()) {
            deliveryStaffService.disableDeliveryStaffById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Disabled delivery staff with id: " + id + " successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/enable/{id}")
    public ResponseEntity<?> enableDeliveryStaffById(@PathVariable Long id) {
        Optional<DeliveryStaff> deliveryStaff = deliveryStaffService.getDeliveryStaffById(id);
        if (deliveryStaff.isPresent()) {
            deliveryStaffService.enableDeliveryStaffById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Enabled delivery staff with id: " + id + " successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
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
