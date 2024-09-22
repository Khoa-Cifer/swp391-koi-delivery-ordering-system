package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class DeliveryStaffServiceImpl implements IDeliveryStaffService {
    private final DeliveryStaffRepository deliveryStaffRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String createDeliveryStaff(String email, String username) {
        DeliveryStaff newDeliveryStaff = new DeliveryStaff();

        boolean emailDuplicatedCheck = deliveryStaffRepository.existsByEmail(email);
        if (emailDuplicatedCheck) {
            return "This email already exists";
        }
        newDeliveryStaff.setEmail(email);

        //Default password when create staffs
        String defaultPassword = "123";
        String encodedPassword = passwordEncoder.encode(defaultPassword);
        newDeliveryStaff.setPassword(encodedPassword);

        newDeliveryStaff.setUsername(username);

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
    public List<DeliveryStaff> getAllDeliveryStaffs() {
        return deliveryStaffRepository.findAll();
    }

    @Override
    public Optional<DeliveryStaff> getDeliveryStaffById(Long id) {
        return deliveryStaffRepository.findById(id);
    }

    @Override
    public void deleteDeliveryStaffById(Long id) {
        deliveryStaffRepository.deleteById(id);
    }

    @Override
    public DeliveryStaff updateDeliveryStaffById(Long id, String email, String phoneNumber) {
        Optional<DeliveryStaff> optionalDeliveryStaff = deliveryStaffRepository.findById(id);
        if (optionalDeliveryStaff.isPresent()) {
            DeliveryStaff deliveryStaff = optionalDeliveryStaff.get();
            deliveryStaff.setEmail(email);
            deliveryStaff.setPhoneNumber(phoneNumber);

            return deliveryStaffRepository.save(deliveryStaff);
        } else {
            return null;
        }
    }


}
