package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/roles")
@RequiredArgsConstructor
public class RoleController {
    private final IRoleService roleService;

    @PostMapping("/create-role")
    public String createRole() {
        return roleService.createAllRoles();
    }
}
