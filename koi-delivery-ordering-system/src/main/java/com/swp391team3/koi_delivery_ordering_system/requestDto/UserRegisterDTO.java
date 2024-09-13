package com.swp391team3.koi_delivery_ordering_system.requestDto;

import lombok.Getter;

@Getter
public class UserRegisterDTO {
    private String email;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
}
