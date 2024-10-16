package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ISalesStaffService;
import com.swp391team3.koi_delivery_ordering_system.service.NewsServiceImpl;

import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("api/salesStaff")
@RequiredArgsConstructor
public class SalesStaffController {
    private final ISalesStaffService salesStaffService;

    @PostMapping("/createSalesStaff")
    public ResponseEntity<?> createSalesStaff(@RequestBody StaffRequestCreationDTO request) {
        String result = salesStaffService.createSalesStaff(request.getEmail(), request.getUsername(), request.getPhoneNumber());
        return ResponseEntity.ok(result);
    }

    //Get All Sales Staff
    //PASSED
    @GetMapping("/getAllSalesStaff")
    public ResponseEntity<?> getAllSalesStaff() {
        return ResponseEntity.ok(salesStaffService.getAllSalesStaff());
    }

    //Get Sale Staff By Id
    //PASSED
    @GetMapping("/getSalesStaffById/{id}")
    public ResponseEntity<?> getSalesStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(salesStaffService.getSalesStaffById(id));
    }

    //UPDATE SALES STAFF
    //PASSED
    @PutMapping("/updateSalesStaffById/{id}")
    public ResponseEntity<?> updateSalesStaff(@PathVariable Long id, @RequestBody SalesStaff salesStaff) {
        return ResponseEntity.ok(salesStaffService.updateSalesStaff(id, salesStaff.getEmail(), salesStaff.getPhoneNumber())) ;
    }

    //DELETE SALES STAFF
    //PASSED
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalesStaff(@PathVariable Long id) {
        if(salesStaffService.getSalesStaffById(id).isPresent()){
            salesStaffService.deleteSalesStaffById(id);
            return ResponseEntity.ok("Sales Staff deleted successfully");
        }
        return ResponseEntity.ok("Sales Staff not found");
    }

    @PutMapping("/updateSalesStaffProfile")
    public ResponseEntity<?> updateSalesStaffProfile(@RequestBody UserUpdateRequestDTO request) {
        return ResponseEntity.ok(salesStaffService.salesStaffUpdateProfile(request));
    }

    @PutMapping("/updateSalesStaffAvatar/{id}")
    public ResponseEntity<?> updateSalesStaffProfileAvatar(
            @PathVariable("id") Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(salesStaffService.salesStaffUpdateAvatar(id, file));
    }
}
