package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.exception.ValidationException;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    private static final String PHONE_REGEX = "^(\\+84|0)[3-9]\\d{8}$";
    private final CustomerRepository customerRepository;

    public ValidationService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public void validatePhoneNumber(String phoneNumber) {
        if (phoneNumber == null || !phoneNumber.matches(PHONE_REGEX)) {
            throw new ValidationException("Invalid phone number format");
        }
    }
    public void validateEmailRegisteredActive(String email) {
        if(customerRepository.existsByEmailRegisteredActive(email)) {
            throw new ValidationException("Email already registered");
        }
    }
    public boolean validateEmailRegisteredNotActive(String email) {
        if(customerRepository.existsByEmailRegisteredNotActive(email)){
            return true;
        }
        return false;
    }
    public void validatePhoneNumberRegisteredActive(String phoneNumber) {
        if(customerRepository.existsByPhoneNumberRegisterdActive(phoneNumber)) {
            throw new ValidationException("Phone number already registered");
        }
    }
}
