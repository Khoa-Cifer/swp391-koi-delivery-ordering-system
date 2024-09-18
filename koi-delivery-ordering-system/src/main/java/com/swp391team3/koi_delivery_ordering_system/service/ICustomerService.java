package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;

public interface ICustomerService {
    public String customerRegister(String email, String password, String username, String phoneNumber);
    public boolean customerLogin(String email, String password);
    public Customer getCustomerByEmail(String email);
    
    public List<Customer> getAllCustomer();
    public Optional<Customer> getCustomerById(long id);
    public Customer updateCustomerById(long id, Customer updatedCustomer);
    public void deleteCustomerById(long id);
}

