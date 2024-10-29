package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestUpdateDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ISalesStaffService;

import java.io.IOException;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("api/salesStaff")
@RequiredArgsConstructor
@EnableMethodSecurity(prePostEnabled = true)
public class SalesStaffController {
    private final ISalesStaffService salesStaffService;

    @PostMapping("/createSalesStaff")
    public ResponseEntity<?> createSalesStaff(@RequestBody StaffRequestCreationDTO request) {
        System.out.println("Result: " + request.getPhoneNumber());
        String result = salesStaffService.createSalesStaff(request.getEmail(), request.getUsername(), request.getPhoneNumber());
        return ResponseEntity.ok(result);
    }

    //Get All Sales Staff
    //PASSED
    @GetMapping("/getAllSalesStaff")
    @PreAuthorize("hasAnyAuthority('Manager')")
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
    @PreAuthorize("hasAuthority('SalesStaff')")
    @PutMapping("/updateSalesStaffById/{id}")
    public ResponseEntity<?> updateSalesStaff(@PathVariable Long id, @RequestBody StaffRequestUpdateDTO salesStaff) {
        return ResponseEntity.ok(salesStaffService.updateSalesStaff(id, salesStaff.getUsername(), salesStaff.getEmail(), salesStaff.getPhoneNumber())) ;
    }
    @PreAuthorize("hasAuthority('SalesStaff')")
    @PutMapping("/updateSalesStaffProfile")
    public ResponseEntity<?> updateSalesStaffProfile(@RequestBody UserUpdateRequestDTO request) {
        return ResponseEntity.ok(salesStaffService.salesStaffUpdateProfile(request));
    }
    @PreAuthorize("hasAuthority('SalesStaff')")
    @PutMapping("/updateSalesStaffAvatar/{id}")
    public ResponseEntity<?> updateSalesStaffProfileAvatar(
            @PathVariable("id") Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(salesStaffService.salesStaffUpdateAvatar(id, file));
    }
    @PutMapping("/disable/{id}")
    public ResponseEntity<?> disableSalesStaffById(@PathVariable Long id) {
        Optional<SalesStaff> salesStaff = salesStaffService.getSalesStaffById(id);
        if (salesStaff.isPresent()) {
            salesStaffService.disableSalesStaffById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Disabled sales staff with id: " + id + " successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/enable/{id}")
    public ResponseEntity<?> enableSalesStaffSalesStaffById(@PathVariable Long id) {
        Optional<SalesStaff> salesStaff = salesStaffService.getSalesStaffById(id);
        if (salesStaff.isPresent()) {
            salesStaffService.enableSalesStaffById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Enabled sales staff with id: " + id + " successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
