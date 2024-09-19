package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Role;
import com.swp391team3.koi_delivery_ordering_system.model.User;
import com.swp391team3.koi_delivery_ordering_system.repository.RoleRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements IUserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    @Override
    public String userRegister(String email, String password, String username) {
        User newUser = new User();
        newUser.setEmail(email);

        boolean emailDuplicatedCheck = userRepository.existsByEmail(email);
        if (emailDuplicatedCheck) {
            return "This email already exists";
        }

        String encodedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encodedPassword);

        newUser.setUsername(username);

        Optional<Role> defaultRole = Optional.ofNullable(roleRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Role customer does not exist"))); //Id of customer role
        newUser.setRole(defaultRole.get());

        userRepository.save(newUser);
        return "Register successfully";
    }

    @Override
    public User userLogin(String email, String password) {
        User matchedUser = userRepository.findUserByEmail(email);
        if (matchedUser != null) {
            if (passwordEncoder.matches(password, matchedUser.getPassword())) {
                return matchedUser;
            } else {
                return null;
            }
        }
        return null;
    }
}
