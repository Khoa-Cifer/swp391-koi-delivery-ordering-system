package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.License;
import com.swp391team3.koi_delivery_ordering_system.requestDto.FishLicenseRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderFishInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ILicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/api/licenses")
@RequiredArgsConstructor

public class LicenseController {
    private final ILicenseService licenseService;

    @PostMapping("/insertLicenseByFishId")
    public ResponseEntity<?> createLicense(
            @RequestParam("licenseName") String licenseName,
            @RequestParam("licenseDescription") String licenseDescription,
            @RequestParam("licenseImage") MultipartFile licenseImage,
            @RequestParam("licenseDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date licenseDate,
            @RequestParam("fishId") Long fishId
    ) throws IOException {
        FishLicenseRequestDTO request = new FishLicenseRequestDTO();
        request.setLicenseName(licenseName);
        request.setLicenseDescription(licenseDescription);
        request.setLicenseImage(licenseImage);
        request.setFishId(fishId);
        request.setLicenseDateOfIssue(licenseDate);
        return ResponseEntity.ok(licenseService.createLicenseRelatedToFishId(request));
    }

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