package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.License;
import com.swp391team3.koi_delivery_ordering_system.service.ILicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/license")
@RequiredArgsConstructor

public class LicenseController {
    private final ILicenseService licenseService;

    @PostMapping("/insertLicenseByFishId")
    //Get All Licenses
    //
    @GetMapping("/getAllLicenses")
    public ResponseEntity<?> getAllLicenses() {
        return ResponseEntity.ok(licenseService.getAllLicenses());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getLicenseById(@PathVariable Long id) {
        return ResponseEntity.ok(licenseService.getLicenseById(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLicenseById(@PathVariable Long id) {
        licenseService.deleteLicenseById(id);
        return ResponseEntity.ok("License deleted successfully");
    }
}