package com.swp391team3.koi_delivery_ordering_system.service;


import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;

import java.util.List;
import java.util.Optional;

public interface IDeliveryStaffService {
    public String createDeliveryStaff(String email, String password, String username, String phoneNumber);
    public boolean deliveryStaffLogin(String email, String password);
    public DeliveryStaff getDeliveryStaffByEmail(String email);

    public List<DeliveryStaff> getAllDeliveryStaffs();
    public Optional<DeliveryStaff> getDeliveryStaffById(Long id);
    public void deleteDeliveryStaffById(Long id);
    public DeliveryStaff updateDeliveryStaffById(Long id, String email, String phoneNumber);
}
