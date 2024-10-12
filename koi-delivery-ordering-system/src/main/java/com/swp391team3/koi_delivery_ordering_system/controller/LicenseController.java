package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.requestDto.FishLicenseRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.LicenseFileRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ILicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/licenses")
@RequiredArgsConstructor

public class LicenseController {
    private final ILicenseService licenseService;

    @PostMapping("/insertLicenseByFishId")
    public ResponseEntity<?> createLicense(@RequestBody FishLicenseRequestDTO request) throws IOException {
        return ResponseEntity.ok(licenseService.createLicenseRelatedToFishId(request));
    }

    @PostMapping("/insertLicenseFiles")
    public ResponseEntity<?> createLicenseFile(
            @RequestParam("licenseId") Long licenseId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        LicenseFileRequestDTO request = new LicenseFileRequestDTO();
        request.setLicenseId(licenseId);
        request.setFile(file);
        return ResponseEntity.ok(licenseService.createFilesBasedOnLicenseId(request));
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