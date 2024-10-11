package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.License;
import com.swp391team3.koi_delivery_ordering_system.requestDto.FishLicenseRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.LicenseFileRequestDTO;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ILicenseService {
    List<License> getAllLicenses();
    Optional<License> getLicenseById(Long id);
    void deleteLicenseById(Long id);
    Long createLicenseRelatedToFishId(FishLicenseRequestDTO request) throws IOException;
    boolean createFilesBasedOnLicenseId(LicenseFileRequestDTO request) throws IOException;
}