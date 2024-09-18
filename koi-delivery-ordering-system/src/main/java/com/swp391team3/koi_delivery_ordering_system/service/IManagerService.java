package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;

public interface IManagerService {
    public List<Manager> getAllManager();
    public Optional<Manager> getManagerById(long id);
    public Manager createManager(Manager manager);
    public Manager updateManagerById(long id, Manager manager);
    public void deleteManagerById(long id);
}
