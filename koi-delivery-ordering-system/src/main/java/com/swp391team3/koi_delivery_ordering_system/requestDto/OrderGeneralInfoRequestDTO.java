package com.swp391team3.koi_delivery_ordering_system.requestDto;

import lombok.Getter;

@Getter
public class OrderGeneralInfoRequestDTO {
    private Long customerId;
    private String name;
    private String description;
    private String destinationAddress;
    private String longitude;
    private String latitude;
}
