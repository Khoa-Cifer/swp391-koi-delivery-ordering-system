package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveringType;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveringTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/delivering-type")
@RequiredArgsConstructor
public class DeliveringTypeController {
    private final IDeliveringTypeService deliveringTypeService;

    //Get All Delivering Types
    //PASSED
    @GetMapping("/getAllDeliveringTypes")
    public ResponseEntity<?> getAllDeliveringTypes() {
        return ResponseEntity.ok(deliveringTypeService.getAllDeliveringTypes());
    }

    //Get Delivering Type By Id
    //PASSED
    @GetMapping("/{id}")
    public ResponseEntity<?> getDeliveringTypeById(@PathVariable long id) {
        return ResponseEntity.ok(deliveringTypeService.getDeliveringTypeById(id));
    }

    //Add Delivering Type
    //PASSED
    @PostMapping("/add")
    public ResponseEntity<?> addDeliveringType(@RequestBody DeliveringType deliveringType) {
        boolean result = deliveringTypeService.addDeliveringType(deliveringType.getName(), deliveringType.getDescription());
        if (result) {
            return ResponseEntity.ok("Delivering type added successfully");
        } else {
            return ResponseEntity.status(500).body("Failed to add delivering type");
        }
    }

    //Update Delivering Type
    //PASSED
    @PutMapping("/{id}")
    public ResponseEntity<?> updateDeliveringType(@PathVariable Long id, @RequestBody DeliveringType deliveringType) {
        DeliveringType updatedType = deliveringTypeService.updateDeliveringType(id, deliveringType.getName(), deliveringType.getDescription());
        return ResponseEntity.ok(updatedType);
    }

    //Delete Delivering Type
    //PASSED
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDeliveringType(@PathVariable long id) {
        deliveringTypeService.deleteDeliveringType(id);
        return ResponseEntity.ok("Delivering type deleted successfully");
    }

}
