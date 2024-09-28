package com.swp391team3.koi_delivery_ordering_system.requestDto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class FishLicenseRequestDTO {
    private String licenseName;
    private String licenseDescription;
    private MultipartFile licenseImage;
    private Long fishId;
}
