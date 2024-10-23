package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.repository.ManagerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements IManagerService{
    private final ManagerRepository managerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<Manager> getAllManager() {
        return managerRepository.findAll();
    }

    @Override
    public Optional<Manager> getManagerById(Long id) {
        return managerRepository.findById(id);
    }

    @Override
    public Manager updateManager(Long id, String email, String username, String phoneNumber) {
        Optional<Manager> existingManager = managerRepository.findById(id);
        if (existingManager.isPresent()) {
            Manager updatedManager = existingManager.get();
            updatedManager.setEmail(email);
            updatedManager.setPhoneNumber(phoneNumber);
            updatedManager.setUsername(username);
            return managerRepository.save(updatedManager);
        } else {
            throw new RuntimeException("Manager not found");
        }
    }

    @Override
    public void deleteManagerById(Long id) {
        managerRepository.deleteById(id);
    }

    @Override
    public boolean managerLogin(String email, String password) {
        Manager matchedManager = getManagerByEmail(email);
        if (matchedManager != null) {
            if (passwordEncoder.matches(password, matchedManager.getPassword())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public String createNewManager(StaffRequestCreationDTO request) {
        Manager newManager = new Manager();
        boolean emailDuplicatedCheck = managerRepository.existsByEmail(request.getEmail());

        if (emailDuplicatedCheck) {
            return "This email already exists";
        }

        newManager.setEmail(request.getEmail());
        newManager.setPhoneNumber(request.getPhoneNumber());
        String defaultPassword = "12345678";
        String encodedPassword = passwordEncoder.encode(defaultPassword);
        newManager.setPassword(encodedPassword);
        newManager.setUsername(request.getUsername());
        managerRepository.save(newManager);
        return "Account create successfully";
    }

    @Override
    public Manager getManagerByEmail(String email) {
        return managerRepository.findByEmail(email);
    }
}
