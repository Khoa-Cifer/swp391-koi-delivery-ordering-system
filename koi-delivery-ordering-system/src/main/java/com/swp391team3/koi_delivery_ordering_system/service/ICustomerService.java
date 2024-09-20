package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;

import java.util.List;

public interface ICustomerService {
    public String customerRegister(String email, String password, String username, String phoneNumber);
    public boolean customerLogin(String email, String password);
    public Customer getCustomerByEmail(String email);
    public List<Customer> getAllCustomers();
}
