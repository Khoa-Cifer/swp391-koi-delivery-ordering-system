package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.repository.ManagerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements IManagerService{
    private final ManagerRepository managerRepository;

    @Override
    public List<Manager> getAllManager() {
        return managerRepository.findAll();
    }

    @Override
    public Optional<Manager> getManagerById(long id) {
        return managerRepository.findById(id);
    }

    @Override
    public Manager createManager(Manager manager) {
        return managerRepository.save(manager);
    }

    @Override
    public Manager updateManagerById(long id, Manager manager) {
       return managerRepository.updateManagerById(id, manager.getEmail(), manager.getPassword());
    }

    @Override
    public void deleteManagerById(long id) {
        managerRepository.deleteById(id);
    }
    
}
