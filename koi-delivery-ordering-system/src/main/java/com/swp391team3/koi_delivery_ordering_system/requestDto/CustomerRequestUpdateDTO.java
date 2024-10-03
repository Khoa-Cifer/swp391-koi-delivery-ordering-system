package com.swp391team3.koi_delivery_ordering_system.requestDto;

import lombok.Getter;

@Getter
public class CustomerRequestUpdateDTO {
    private Long id;
    private String email;
    private String password;
    private String username;
    private String phoneNumber;
}
