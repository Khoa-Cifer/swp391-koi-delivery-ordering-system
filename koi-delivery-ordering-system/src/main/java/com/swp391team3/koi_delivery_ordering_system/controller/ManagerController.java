package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.service.IManagerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/managers")
public class ManagerController {

    private final IManagerService managerService;

    // Get all managers
    @GetMapping
    public ResponseEntity<List<Manager>> getAllManagers() {
        List<Manager> managers = managerService.getAllManager();
        return new ResponseEntity<>(managers, HttpStatus.OK);
    }

    // Get manager by ID
    @GetMapping("/{id}")
    public ResponseEntity<Manager> getManagerById(@PathVariable("id") long id) {
        Optional<Manager> manager = managerService.getManagerById(id);
        return manager.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create a new manager
    @PostMapping
    public ResponseEntity<Manager> createManager(@RequestBody Manager manager) {
        Manager createdManager = managerService.createManager(manager);
        return new ResponseEntity<>(createdManager, HttpStatus.CREATED);
    }

    // Update an existing manager by ID
    @PutMapping("/{id}")
    public ResponseEntity<Manager> updateManagerById(@PathVariable("id") long id, @RequestBody Manager manager) {
        Manager updatedManager = managerService.updateManagerById(id, manager);
        if (updatedManager != null) {
            return new ResponseEntity<>(updatedManager, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a manager by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManagerById(@PathVariable("id") long id) {
        Optional<Manager> manager = managerService.getManagerById(id);
        if (manager.isPresent()) {
            managerService.deleteManagerById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
