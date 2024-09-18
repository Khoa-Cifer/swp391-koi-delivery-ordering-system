package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.swp391team3.koi_delivery_ordering_system.model.License;
import com.swp391team3.koi_delivery_ordering_system.repository.LicenseRespository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LicenseServiceImpl implements ILicenseService{
    private final LicenseRespository licenseRespository;

    @Override
    public List<License> getAllLicense() {
        return licenseRespository.findAll();
    }

    @Override
    public Optional<License> getLicenseById(long id) {
        return licenseRespository.findById(id);    
    }

    @Override
    public License updateLicenseById(long id, License license) {
        return licenseRespository.updateById(id, license.getName(), license.getDescription());    
    }

    @Override
    public License createLicense(License license) {
        return licenseRespository.save(license);
    }
    
}
