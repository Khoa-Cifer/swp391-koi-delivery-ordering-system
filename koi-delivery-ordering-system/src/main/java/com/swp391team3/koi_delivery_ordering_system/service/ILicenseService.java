package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.License;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ILicenseService {
    public List<License> getAllLicenses();
    public Optional<License> getLicenseById(Long id);
    public void deleteLicenseById(Long id);
    public License updateLicense(Long id, String name, String type, String description, Date dateOfIsDate);
}
