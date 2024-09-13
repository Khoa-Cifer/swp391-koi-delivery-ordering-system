package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.User;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRegisterDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @PostMapping("/login")
    public User login(@RequestBody UserLoginDTO request) {
        return userService.userLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRegisterDTO request) {
        return userService.userRegister(request.getEmail(), request.getPassword(), request.getFirstName(), request.getMiddleName(), request.getLastName());
    }
}
