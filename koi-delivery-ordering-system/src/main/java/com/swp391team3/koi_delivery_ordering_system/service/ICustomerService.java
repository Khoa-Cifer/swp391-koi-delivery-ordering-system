package com.swp391team3.koi_delivery_ordering_system.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.requestDto.CustomerRequestUpdateDTO;
import org.springframework.web.multipart.MultipartFile;

public interface ICustomerService {
    public String customerRegister(String email, String password, String username, String phoneNumber);
    public boolean customerLogin(String email, String password);
    public Customer getCustomerByEmail(String email);
    
    public List<Customer> getAllCustomer();
    public Optional<Customer> getCustomerById(Long id);
    public Customer updateCustomerById(Long id, String email, String phoneNumber);
    public void deleteCustomerById(Long id);

    public String customerUpdateProfile(CustomerRequestUpdateDTO request);
    public String customerUpdateAvatar(Long id, MultipartFile file) throws IOException;
}

