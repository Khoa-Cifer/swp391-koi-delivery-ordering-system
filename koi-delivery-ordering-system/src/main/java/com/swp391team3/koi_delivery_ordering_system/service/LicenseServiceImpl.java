package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.File;
import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import com.swp391team3.koi_delivery_ordering_system.model.License;
import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.repository.FishRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.LicenseRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.FishLicenseRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service

public class LicenseServiceImpl implements ILicenseService{
    private final LicenseRepository licenseRepository;
    private final IFileService fileService;
    private final FishRepository fishRepository;

    @Override
    public List<License> getAllLicenses() {
        return licenseRepository.findAll();
    }

    @Override
    public Optional<License> getLicenseById(Long id) {
        return licenseRepository.findById(id);
    }

    @Override
    public void deleteLicenseById(Long id) {
        licenseRepository.deleteById(id);
    }

    @Override
    public License createLicenseRelatedToFishId(FishLicenseRequestDTO request) throws IOException {
        License newLicense = new License();
        newLicense.setName(request.getLicenseName());
        newLicense.setDescription(request.getLicenseDescription());
//        newLicense.setDateOfIssue(new Date());
//        newLicense.setFile();
        File uploadedFile = fileService.uploadFileToFileSystem(request.getLicenseImage());
        Optional<Fish> foundedFish = fishRepository.findById(request.getFishId());
        newLicense.setFile(uploadedFile);
        newLicense.setFish(foundedFish.get());
        newLicense.setDateOfIssue(request.getLicenseDateOfIssue());
        licenseRepository.save(newLicense);
        return newLicense;
    }
}