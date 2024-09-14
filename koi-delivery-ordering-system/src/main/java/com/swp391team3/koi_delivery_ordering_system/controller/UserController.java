package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.User;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import com.swp391team3.koi_delivery_ordering_system.responseDto.UserResponseLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @PostMapping("/login")
    public UserResponseLoginDTO login(@RequestBody UserRequestLoginDTO request) {
        User foundUser = userService.userLogin(request.getEmail(), request.getPassword());
        UserResponseLoginDTO response = new UserResponseLoginDTO();
        response.setEmail(foundUser.getEmail());
        response.setUsername(foundUser.getUsername());
        response.setRoleId(foundUser.getRole().getId());
        return response;
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRequestRegisterDTO request) {
        return userService.userRegister(request.getEmail(), request.getPassword(), request.getUsername());
    }
}
