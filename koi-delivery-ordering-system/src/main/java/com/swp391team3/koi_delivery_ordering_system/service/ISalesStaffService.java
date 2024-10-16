package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;

public interface ISalesStaffService {
    String createSalesStaff(String email, String username, String phoneNumber);
    SalesStaff getSalesStaffByEmail(String email);
    boolean salesStaffLogin(String email, String password);

    List<SalesStaff> getAllSalesStaff();
    Optional<SalesStaff> getSalesStaffById(Long id);
    SalesStaff updateSalesStaff(Long id, String email, String phoneNumber);
    void deleteSalesStaffById(Long id);
}
