package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;
import com.swp391team3.koi_delivery_ordering_system.repository.FishRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.LicenseFileRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.LicenseRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.FishLicenseRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.LicenseFileRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    private final LicenseFileRepository licenseFileRepository;

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
    public Long createLicenseRelatedToFishId(FishLicenseRequestDTO request) throws IOException {
        License newLicense = new License();
        newLicense.setName(request.getLicenseName());
        newLicense.setDescription(request.getLicenseDescription());
        Optional<Fish> foundedFish = fishRepository.findById(request.getFishId());
        newLicense.setFish(foundedFish.get());
        System.out.println("Date is " + request.getLicenseDate());
        newLicense.setDateOfIssue(request.getLicenseDate());
        licenseRepository.save(newLicense);
        return newLicense.getId();
    }

    @Override
    public boolean createFilesBasedOnLicenseId(LicenseFileRequestDTO request) throws IOException {
        Optional<License> license = licenseRepository.findById(request.getLicenseId());
        try {
            LicenseFile licenseFile = new LicenseFile();
            licenseFile.setLicense(license.get());
            File uploadedFile = fileService.uploadFileToFileSystem(request.getFile());
            licenseFile.setFile(uploadedFile);
            licenseFileRepository.save(licenseFile);
            return true;
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
    }
    @Override
    public License updateLicense(Long licenseId, String name, String description, Date dateOfIssue) {
        License license = licenseRepository.findById(licenseId)
                .orElseThrow(() -> new RuntimeException("License not found"));

        license.setName(name);
        license.setDescription(description);
        license.setDateOfIssue(dateOfIssue);

        return licenseRepository.save(license);
    }
    @Override
    public LicenseFile updateLicenseFile(Long licenceId, Long fileId, MultipartFile file) throws IOException {
        Optional<License> optionalLicense = licenseRepository.findById(licenceId);

        if (optionalLicense.isPresent()) {

            LicenseFile licenseFile = licenseFileRepository.findAll().stream()
                    .filter(licenseFile1 -> licenseFile1.getLicense().getId().equals(licenceId)
                    && licenseFile1.getFile().getId().equals(fileId))
                    .findFirst().orElseThrow(() -> new RuntimeException("File does not belong to the specified license"));

            File updatedFile = fileService.uploadFileToFileSystem(file);

            licenseFile.setFile(updatedFile);

            return licenseFileRepository.save(licenseFile);
        } else {
            throw new RuntimeException("File not found");
        }
    }
}