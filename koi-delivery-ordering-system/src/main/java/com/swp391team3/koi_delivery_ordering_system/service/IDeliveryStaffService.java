package com.swp391team3.koi_delivery_ordering_system.service;

import java.util.List;
import java.util.Optional;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;

public interface IDeliveryStaffService {
    public String createDeliveryStaff(String email, String password, String username, String phoneNumber);
    public boolean deliveryStaffLogin(String email, String password);
    public DeliveryStaff getDeliveryStaffByEmail(String email);

    public List<DeliveryStaff> getAllDeliveryStaff();
    public Optional<DeliveryStaff>  getDeliveryStaffById(long id);
    public void deleteDeliveryStaffById(long id);
    public DeliveryStaff updateDeliveryStaffById(long id, DeliveryStaff updatedDeliveryStaff);
}
