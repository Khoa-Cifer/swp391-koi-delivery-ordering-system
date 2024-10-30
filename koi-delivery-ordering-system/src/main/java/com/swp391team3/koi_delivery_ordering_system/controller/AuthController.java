package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.config.thirdParty.EmailService;
import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.ManagerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.SalesStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.EmailDetailDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestLoginDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ICustomerService;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;
import com.swp391team3.koi_delivery_ordering_system.service.IManagerService;
import com.swp391team3.koi_delivery_ordering_system.service.ISalesStaffService;
import com.swp391team3.koi_delivery_ordering_system.config.security.TokenService;
import com.swp391team3.koi_delivery_ordering_system.utils.UserType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final ICustomerService customerService;
    private final ISalesStaffService salesStaffService;
    private final IDeliveryStaffService deliveryStaffService;
    private final IManagerService managerService;

    @Autowired
    TokenService tokenService;
    @Autowired
    EmailService emailService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private SalesStaffRepository salesStaffRepository;
    @Autowired
    private DeliveryStaffRepository deliveryStaffRepository;
    @Autowired
    private ManagerRepository managerRepository;

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
                if (foundCustomer.isActiveStatus()) {
                    response = tokenService.generateToken(foundCustomer);
                }
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
        } else if (userType == 4) {
            boolean status = managerService.managerLogin(request.getEmail(), request.getPassword());
            if (status) {
                foundUserStatus = userType;
                Manager foundManager = managerService.getManagerByEmail(request.getEmail());
                response = tokenService.generateToken(foundManager);
            }
        }

        if (foundUserStatus == 0) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        return ResponseEntity.ok(response);
    }


    @GetMapping("/register")
    public RedirectView register(@RequestParam String email) {
//        return ResponseEntity.ok(customerService.customerRegister(email, password, username, phoneNumber));
        boolean result = customerService.customerConfirm(email);
        if (result) {
            try {
                return new RedirectView("http://localhost:5173/registration-success");
            } catch (Exception e) {
                return new RedirectView("http://localhost:5173/404");
            }
        } else {
            return new RedirectView("http://localhost:5173/404");
        }
    }

    @PostMapping("/register-confirmation")
    public ResponseEntity<?> registerConfirmation(@RequestBody UserRequestRegisterDTO request) {
        return ResponseEntity.ok(customerService.registrationConfirm(request));
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email, @RequestParam int userType) {
        EmailDetailDTO emailDetail = new EmailDetailDTO();
        if (userType == UserType.CUSTOMER_ROLE_ID) {
            Customer customer = customerService.getCustomerByEmail(email);
            if (customer != null) {
                emailDetail.setReceiver(customer);
            }
        } else if (userType == UserType.SALES_STAFF_ROLE_ID) {
            SalesStaff salesStaff = salesStaffService.getSalesStaffByEmail(email);
            if (salesStaff != null) {
                emailDetail.setReceiver(salesStaff);
            }
        } else if (userType == UserType.DELIVERY_STAFF_ROLE_ID) {
            DeliveryStaff deliveryStaff = deliveryStaffService.getDeliveryStaffByEmail(email);
            if (deliveryStaff != null) {
                emailDetail.setReceiver(deliveryStaff);
            }
        } else if (userType == UserType.MANAGER_ROLE_ID) {
            Manager manager = managerService.getManagerByEmail(email);
            if (manager != null) {
                emailDetail.setReceiver(manager);
            }
        }
        if(emailDetail.getReceiver() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email not found or unable to send reset link.");
        }
        emailDetail.setSubject("You have request a new password");
        emailDetail.setLink("");
        emailService.sendEmail(emailDetail, 12);
        return ResponseEntity.ok().build();

    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email
            , @RequestParam int userType, @RequestParam String password) {
        String newPassword = passwordEncoder.encode(password);
        boolean passwordUpdated = false;

        // Kiểm tra roleId và cập nhật mật khẩu tương ứng
        if (userType == UserType.CUSTOMER_ROLE_ID) {
            Customer customer = customerService.getCustomerByEmail(email);
            if (customer != null) {
                customer.setPassword(newPassword);
                customerRepository.save(customer);
                passwordUpdated = true;
            }
        } else if (userType == UserType.SALES_STAFF_ROLE_ID) {
            SalesStaff salesStaff = salesStaffService.getSalesStaffByEmail(email);
            if (salesStaff != null) {
                salesStaff.setPassword(newPassword);
                salesStaffRepository.save(salesStaff);
                passwordUpdated = true;
            }
        } else if (userType == UserType.DELIVERY_STAFF_ROLE_ID) {
            DeliveryStaff deliveryStaff = deliveryStaffService.getDeliveryStaffByEmail(email);
            if (deliveryStaff != null) {
                deliveryStaff.setPassword(newPassword);
                deliveryStaffRepository.save(deliveryStaff);
                passwordUpdated = true;
            }
        } else if (userType == UserType.MANAGER_ROLE_ID) {
            Manager manager = managerService.getManagerByEmail(email);
            if (manager != null) {
                manager.setPassword(newPassword);
                managerRepository.save(manager);
                passwordUpdated = true;
            }
        }

        if (!passwordUpdated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid userType or email.");
        }

        return ResponseEntity.ok(passwordUpdated);
    }


}
