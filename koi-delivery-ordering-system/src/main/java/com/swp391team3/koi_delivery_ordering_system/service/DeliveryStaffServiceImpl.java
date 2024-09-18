package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DeliveryStaffServiceImpl implements IDeliveryStaffService {
    private final DeliveryStaffRepository deliveryStaffRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String createDeliveryStaff(String email, String password, String username, String phoneNumber) {
        DeliveryStaff newDeliveryStaff = new DeliveryStaff();
        newDeliveryStaff.setEmail(email);

        boolean emailDuplicatedCheck = deliveryStaffRepository.existsByEmail(email);
        if (emailDuplicatedCheck) {
            return "This email already exists";
        }

        String encodedPassword = passwordEncoder.encode(password);
        newDeliveryStaff.setPassword(encodedPassword);

        newDeliveryStaff.setUsername(username);
        newDeliveryStaff.setPhoneNumber(phoneNumber);

        deliveryStaffRepository.save(newDeliveryStaff);
        return "Account create successfully";
    }

    @Override
    public boolean deliveryStaffLogin(String email, String password) {
        DeliveryStaff matchedCustomer = getDeliveryStaffByEmail(email);
        if (matchedCustomer != null) {
            if (passwordEncoder.matches(password, matchedCustomer.getPassword())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public DeliveryStaff getDeliveryStaffByEmail(String email) {
        return  deliveryStaffRepository.findDeliveryStaffByEmail(email);
    }

    @Override
    public List<DeliveryStaff> getAllDeliveryStaff() {
        return deliveryStaffRepository.findAll(); 
    }

    @Override
    public Optional<DeliveryStaff> getDeliveryStaffById(long id) {
        return deliveryStaffRepository.findById(id);
    }

    @Override
    public void deleteDeliveryStaffById(long id) {
        deliveryStaffRepository.deleteById(id);
    }

    @Override
    public DeliveryStaff updateDeliveryStaffById(long id, DeliveryStaff updatedDeliveryStaff) {
        return deliveryStaffRepository.updateDeliveryStaffById(id, updatedDeliveryStaff.getEmail(), updatedDeliveryStaff.getPassword());
    }
}
