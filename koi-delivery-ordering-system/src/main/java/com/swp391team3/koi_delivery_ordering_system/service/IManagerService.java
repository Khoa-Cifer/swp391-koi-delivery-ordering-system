package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;

public interface IManagerService {
    public List<Manager> getAllManager();
    public Optional<Manager> getManagerById(Long id);
    public Manager updateManager(Long id, String email, String phoneNumber);
    public void deleteManagerById(Long id);
    public boolean managerLogin(String email, String password);
    public String createNewManager(UserRequestRegisterDTO request);
    public Manager getManagerByEmail(String email);
}
