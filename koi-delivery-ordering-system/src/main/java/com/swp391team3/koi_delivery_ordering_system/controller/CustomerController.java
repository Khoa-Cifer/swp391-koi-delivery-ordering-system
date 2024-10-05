package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.requestDto.CustomerRequestUpdateDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.UserRequestRegisterDTO;
import com.swp391team3.koi_delivery_ordering_system.service.ICustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customer")
public class CustomerController {
    private final ICustomerService customerService;


    // Get all customers
    //PASSED
    @GetMapping("/getAllCustomers")
    public ResponseEntity<?> getAllCustomer() {
        List<Customer> customers = customerService.getAllCustomer();
        return ResponseEntity.ok(customers);
    }

    // Get customer by ID
    //PASSED
    @GetMapping("/getCustomerById/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    // Get customer by email
    //PASSED
    @GetMapping("/email")
    public ResponseEntity<Customer> getCustomerByEmail(@RequestParam String email) {
        Customer customer = customerService.getCustomerByEmail(email);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update customer by ID
    //PASSED
    @PutMapping("/updateCustomerById/{id}")
    public ResponseEntity<Customer> updateCustomerById(@PathVariable Long id, @RequestBody Customer customer) {
        Customer updated = customerService.updateCustomerById(id, customer.getEmail(), customer.getPhoneNumber());
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete customer by ID
    //PASSED
    @DeleteMapping("/deleteCustomerById/{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerService.getCustomerById(id);
        if (customer.isPresent()) {
            customerService.deleteCustomerById(id);
            return ResponseEntity.status(HttpStatus.OK).body("Deleted customer with id: " + id + " successfully");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/updateCustomerProfile")
    public ResponseEntity<?> updateCustomerProfile(@RequestBody CustomerRequestUpdateDTO request) {
        return ResponseEntity.ok(customerService.customerUpdateProfile(request));
    }

    @PutMapping("/updateCustomerAvatar/{id}")
    public ResponseEntity<?> updateCustomerProfileAvatar(
            @PathVariable("id") Long id,
            @RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(customerService.customerUpdateAvatar(id, file));
    }
}
