package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.License;

public interface ILicenseService {
    public List<License> getAllLicense();
    public Optional<License> getLicenseById(long id);
    public License updateLicenseById(long id, License license);
    public License createLicense(License license);
}
