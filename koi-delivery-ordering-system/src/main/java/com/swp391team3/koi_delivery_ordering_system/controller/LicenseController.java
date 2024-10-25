package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.License;
import com.swp391team3.koi_delivery_ordering_system.requestDto.FishLicenseRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.LicenseFileRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ILicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.Optional;

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

    @PutMapping(value = "/update-license-by-id")
    public ResponseEntity<?> editLicense(
            @RequestParam(name = "licenseId") Long licenseId,
            @RequestParam(name = "licenseName") String name,
            @RequestParam(name = "licenseDescription") String description,
            @RequestParam(name = "licenseDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date dateOfIssue) {

            Optional<License> optionalLicense = licenseService.getLicenseById(licenseId);

            if (optionalLicense.isPresent()) {
                License updatedLicense = licenseService.updateLicense(licenseId, name, description, dateOfIssue);
                return ResponseEntity.ok(updatedLicense);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The license does not exist");
            }
    }

    @PutMapping("/update-license-files")
    public ResponseEntity<?> updateLicenseFile(
            @RequestParam("licenseId") Long licenseId,
            @RequestParam("fileId") Long fileId,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        boolean updatedFile = licenseService.updateLicenseFile(licenseId, fileId, file);
        if (updatedFile)
            return ResponseEntity.status(HttpStatus.OK).body("License updated successfully");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The license does not exist");
    }

}