package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;

public interface ISalesStaffService {
    public String createSalesStaff(String email, String password, String username, String phoneNumber);
    public SalesStaff getSalesStaffByEmail(String email);
    public boolean salesStaffLogin(String email, String password);

    public List<SalesStaff> getAllSalesStaff();
    public Optional<SalesStaff> getSalesStaffById(long id);
    public void updateSalesStaffById(long id, SalesStaff updatedSalesStaff);
    public void deleteSalesStaffById(long id);
}
