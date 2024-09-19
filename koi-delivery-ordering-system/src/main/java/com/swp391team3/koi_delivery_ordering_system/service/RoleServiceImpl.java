package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Role;
import com.swp391team3.koi_delivery_ordering_system.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RoleServiceImpl implements IRoleService{
    private final RoleRepository roleRepository;

    @Override
    public String createAllRoles() {
        Role managerRole = new Role();
        managerRole.setRoleName("ROLE_MANAGER");
        roleRepository.save(managerRole);
        Role customerRole = new Role();
        customerRole.setRoleName("ROLE_CUSTOMER");
        roleRepository.save(customerRole);
        Role salesRole = new Role();
        salesRole.setRoleName("ROLE_SALES");
        roleRepository.save(salesRole);
        Role deliveringRole = new Role();
        deliveringRole.setRoleName("ROLE_DELIVERING");
        roleRepository.save(deliveringRole);
        return "Create role successfully";
    }
}
