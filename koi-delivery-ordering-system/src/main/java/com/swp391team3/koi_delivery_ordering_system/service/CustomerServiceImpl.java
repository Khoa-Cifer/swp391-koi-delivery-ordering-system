package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements ICustomerService {
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String customerRegister(String email, String password, String username, String phoneNumber) {
        Customer newCustomer = new Customer();
        newCustomer.setEmail(email);

        boolean emailDuplicatedCheck = customerRepository.existsByEmail(email);
        if (emailDuplicatedCheck) {
            return "This email already exists";
        }

        String encodedPassword = passwordEncoder.encode(password);
        newCustomer.setPassword(encodedPassword);

        newCustomer.setUsername(username);
        newCustomer.setPhoneNumber(phoneNumber);

        customerRepository.save(newCustomer);
        return "Register successfully";
    }

    @Override
    public Customer customerLogin(String email, String password) {
        Customer matchedCustomer = customerRepository.findCustomerByEmail(email);
        if (matchedCustomer != null) {
            if (passwordEncoder.matches(password, matchedCustomer.getPassword())) {
                return matchedCustomer;
            } else {
                return null;
            }
        }
        return null;
    }
}
