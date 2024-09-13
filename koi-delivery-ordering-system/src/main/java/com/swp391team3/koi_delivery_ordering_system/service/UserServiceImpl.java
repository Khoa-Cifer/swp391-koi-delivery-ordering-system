package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {
    @Override
    public String userRegister(String email, String password, String firstName, String lastName, String middleName) {

        return "";
    }

    @Override
    public User userLogin(String email, String password) {
        return null;
    }
}
