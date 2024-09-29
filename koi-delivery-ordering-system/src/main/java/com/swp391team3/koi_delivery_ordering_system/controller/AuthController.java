package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import com.swp391team3.koi_delivery_ordering_system.responseDto.UserResponseLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ICustomerService;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;
import com.swp391team3.koi_delivery_ordering_system.service.ISalesStaffService;
import com.swp391team3.koi_delivery_ordering_system.config.security.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final ICustomerService customerService;
    private final ISalesStaffService salesStaffService;
    private final IDeliveryStaffService deliveryStaffService;

    @Autowired
    TokenService tokenService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> login(@RequestBody UserRequestLoginDTO request) {
        int userType = request.getUserType();
        int foundUserStatus = 0;
        String response = null;
        if (userType == 1) {
            boolean status = customerService.customerLogin(request.getEmail(), request.getPassword());
            if (status) {
                foundUserStatus = userType;
                Customer foundCustomer = customerService.getCustomerByEmail(request.getEmail());
                response = tokenService.generateToken(foundCustomer);
            }
        } else if (userType == 2) {
            boolean status = salesStaffService.salesStaffLogin(request.getEmail(), request.getPassword());
            if (status) {
                foundUserStatus = userType;
                SalesStaff foundSalesStaff = salesStaffService.getSalesStaffByEmail(request.getEmail());
                response = tokenService.generateToken(foundSalesStaff);
            }
        } else if (userType == 3) {
            boolean status = deliveryStaffService.deliveryStaffLogin(request.getEmail(), request.getPassword());
            if (status) {
                foundUserStatus = userType;
                DeliveryStaff foundDeliveryStaff = deliveryStaffService.getDeliveryStaffByEmail(request.getEmail());
                response = tokenService.generateToken(foundDeliveryStaff);
            }
        }
        if (foundUserStatus == 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public String register(@RequestBody UserRequestRegisterDTO request) {
        return customerService.customerRegister(request.getEmail(), request.getPassword(), request.getUsername(), request.getPhoneNumber());
    }
}
