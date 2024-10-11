package com.swp391team3.koi_delivery_ordering_system.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.requestDto.CustomerUpdateRequestDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ICustomerService {
    String customerRegister(String email, String password, String username, String phoneNumber);
    boolean customerLogin(String email, String password);
    Customer getCustomerByEmail(String email);
    
    List<Customer> getAllCustomer();
    Optional<Customer> getCustomerById(Long id);
    Customer updateCustomerById(Long id, String email, String phoneNumber);
    void deleteCustomerById(Long id);

    String customerUpdateProfile(CustomerUpdateRequestDTO request);
    String customerUpdateAvatar(Long id, MultipartFile file) throws IOException;
}

