package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.repository.SalesStaffRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class SalesStaffServiceImpl implements ISalesStaffService {
    private final SalesStaffRepository salesStaffRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String createSalesStaff(String email, String username) {
        SalesStaff newSalesStaff = new SalesStaff();

        boolean emailDuplicatedCheck = salesStaffRepository.existsByEmail(email);
        if (emailDuplicatedCheck) {
            return "This email already exists";
        }

        newSalesStaff.setEmail(email);

        String defaultPassword = "123";
        String encodedPassword = passwordEncoder.encode(defaultPassword);
        newSalesStaff.setPassword(encodedPassword);

        newSalesStaff.setUsername(username);

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

    @Override
    public List<SalesStaff> getAllSalesStaff() {
        return salesStaffRepository.findAll();    
    }

    @Override
    public Optional<SalesStaff> getSalesStaffById(Long id) {
        return salesStaffRepository.findById(id);    
    }

    @Override
    public SalesStaff updateSalesStaff(Long id, String email, String phoneNumber) {
        SalesStaff salesStaff = salesStaffRepository.findById(id).get();
        if(salesStaff != null) {
            salesStaff.setEmail(email);
            salesStaff.setPhoneNumber(phoneNumber);

            salesStaffRepository.save(salesStaff);
            return salesStaffRepository.save(salesStaff);
        }
        return null;
    }

    @Override
    public void deleteSalesStaffById(Long id) {
        salesStaffRepository.deleteById(id);
    }
}
