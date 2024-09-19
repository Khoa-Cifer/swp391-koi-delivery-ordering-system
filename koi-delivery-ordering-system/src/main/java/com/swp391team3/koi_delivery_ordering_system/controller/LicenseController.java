package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.License;
import com.swp391team3.koi_delivery_ordering_system.service.ILicenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/licenses")
public class LicenseController {

    private final ILicenseService licenseService;

    @GetMapping
    public ResponseEntity<List<License>> getAllLicenses() {
        List<License> licenses = licenseService.getAllLicense();
        return new ResponseEntity<>(licenses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<License> getLicenseById(@PathVariable("id") long id) {
        Optional<License> license = licenseService.getLicenseById(id);
        if (license.isPresent()) {
            return new ResponseEntity<>(license.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<License> createLicense(@RequestBody License license) {
        License createdLicense = licenseService.createLicense(license);
        return new ResponseEntity<>(createdLicense, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<License> updateLicenseById(@PathVariable("id") long id, @RequestBody License license) {
        License updatedLicense = licenseService.updateLicenseById(id, license);
        if (updatedLicense != null) {
            return new ResponseEntity<>(updatedLicense, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicenseById(@PathVariable("id") long id) {
        Optional<License> license = licenseService.getLicenseById(id);
        if (license.isPresent()) {
            licenseService.deleteLicenseById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
