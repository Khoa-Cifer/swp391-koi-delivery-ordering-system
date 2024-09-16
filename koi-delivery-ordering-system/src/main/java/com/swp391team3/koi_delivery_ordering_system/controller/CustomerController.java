package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import com.swp391team3.koi_delivery_ordering_system.responseDto.UserResponseLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ICustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final ICustomerService customerService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody UserRequestLoginDTO request) {
        Customer foundUser = customerService.customerLogin(request.getEmail(), request.getPassword());
        if (foundUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        UserResponseLoginDTO response = new UserResponseLoginDTO();
        response.setEmail(foundUser.getEmail());
        response.setUsername(foundUser.getUsername());
//        response.setRoleId(foundUser.getRole().getId());

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRequestRegisterDTO request) {
        return customerService.customerRegister(request.getEmail(), request.getPassword(), request.getUsername(), request.getPhoneNumber());
    }
}
