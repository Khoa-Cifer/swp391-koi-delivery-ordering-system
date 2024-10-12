package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;

public interface IManagerService {
    List<Manager> getAllManager();
    Optional<Manager> getManagerById(Long id);
    Manager updateManager(Long id, String email, String phoneNumber);
    void deleteManagerById(Long id);
    boolean managerLogin(String email, String password);
    String createNewManager(UserRequestRegisterDTO request);
    Manager getManagerByEmail(String email);
}
