package com.swp391team3.koi_delivery_ordering_system.responseDto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseLoginDTO {
    private String email;
    private String username;
    private String userRoleName;
    private int roleId;
    private String token;
}
