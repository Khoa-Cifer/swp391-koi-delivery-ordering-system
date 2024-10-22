package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestUpdateDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    private final IManagerService managerService;

    //Get All Managers
    //PASSED
    @GetMapping("/get-all-managers")
    public ResponseEntity<?> getAllManagers() {
        return ResponseEntity.ok(managerService.getAllManager());
    }

    //Get Manager By Id
    //PASSED
    @GetMapping("/get-manager-by-id/{id}")
    public ResponseEntity<?> getManagerById(@PathVariable Long id) {
        return ResponseEntity.ok(managerService.getManagerById(id));
    }

    //Delete Manager
    //PASSED
    @DeleteMapping("/delete-manager-by-id/{id}")
    public void deleteManagerById(@PathVariable Long id) {
        managerService.deleteManagerById(id);
    }

    //Update Manager
    //
    @PutMapping("/update-manager-by-id/{id}")
    public ResponseEntity<?> updateManager(@PathVariable Long id, @RequestBody StaffRequestUpdateDTO request) {
        return ResponseEntity.ok(managerService.updateManager(id, request.getEmail(), request.getUsername(), request.getPhoneNumber()));
    }
}
