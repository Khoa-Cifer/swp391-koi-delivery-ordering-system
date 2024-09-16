package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;

public interface ICustomerService {
    public String customerRegister(String email, String password, String username, String phoneNumber);
    public Customer customerLogin(String email, String password);
}
