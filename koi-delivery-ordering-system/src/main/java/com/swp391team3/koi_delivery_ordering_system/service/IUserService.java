package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.User;

public interface IUserService {
    public String userRegister(String email, String password, String firstName, String middleName, String lastName);
    public User userLogin(String email, String password);
}
