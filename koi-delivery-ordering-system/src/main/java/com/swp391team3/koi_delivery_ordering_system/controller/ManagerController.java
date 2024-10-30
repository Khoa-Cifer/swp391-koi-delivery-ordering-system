package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestUpdateDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    private final IManagerService managerService;

    @PreAuthorize("hasAuthority('Manager')")
    @PostMapping("/create-manager")
    public ResponseEntity<?> createDeliveryStaff(@RequestBody StaffRequestCreationDTO request) {
        String result = managerService.createNewManager(request);
        return ResponseEntity.ok(result);
    }

    //Get All Managers
    //PASSED
    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("/get-all-managers")
    public ResponseEntity<?> getAllManagers() {
        return ResponseEntity.ok(managerService.getAllManager());
    }

    //Get Manager By Id
    //PASSED
    @PreAuthorize("hasAuthority('Manager')")
    @GetMapping("/get-manager-by-id/{id}")
    public ResponseEntity<?> getManagerById(@PathVariable Long id) {
        return ResponseEntity.ok(managerService.getManagerById(id));
    }

    //Delete Manager
    //PASSED
    @PreAuthorize("hasAuthority('Manager')")
    @DeleteMapping("/delete-manager-by-id/{id}")
    public void deleteManagerById(@PathVariable Long id) {
        managerService.deleteManagerById(id);
    }

    //Update Manager
    @PreAuthorize("hasAuthority('Manager')")
    @PutMapping("/update-manager-by-id/{id}")
    public ResponseEntity<?> updateManager(@PathVariable Long id, @RequestBody StaffRequestUpdateDTO request) {
        return ResponseEntity.ok(managerService.updateManager(id, request.getEmail(), request.getUsername(), request.getPhoneNumber()));
    }
}
