package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.repository.SalesStaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SalesStaffServiceImpl implements ISalesStaffService {
    private final SalesStaffRepository salesStaffRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String createSalesStaff(String email, String password, String username, String phoneNumber) {
        SalesStaff newSalesStaff = new SalesStaff();
        newSalesStaff.setEmail(email);

        boolean emailDuplicatedCheck = salesStaffRepository.existsByEmail(email);
        if (emailDuplicatedCheck) {
            return "This email already exists";
        }

        String encodedPassword = passwordEncoder.encode(password);
        newSalesStaff.setPassword(encodedPassword);

        newSalesStaff.setUsername(username);
        newSalesStaff.setPhoneNumber(phoneNumber);

        salesStaffRepository.save(newSalesStaff);
        return "Account create successfully";
    }

    @Override
    public SalesStaff getSalesStaffByEmail(String email) {
        return salesStaffRepository.findSalesStaffByEmail(email);
    }

    @Override
    public boolean salesStaffLogin(String email, String password) {
        SalesStaff matchedCustomer = getSalesStaffByEmail(email);
        if (matchedCustomer != null) {
            if (passwordEncoder.matches(password, matchedCustomer.getPassword())) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }
}
