package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IOrderService;
import com.swp391team3.koi_delivery_ordering_system.service.ISalesStaffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api/salesStaff")
@RequiredArgsConstructor
public class SalesStaffController {
    private final ISalesStaffService salesStaffService;

    private final IOrderService orderService;

    @PostMapping("/createSalesStaff")
    public ResponseEntity<?> createSalesStaff(@RequestBody StaffRequestCreationDTO request) {
        String result = salesStaffService.createSalesStaff(request.getEmail(), request.getUsername());
        return ResponseEntity.ok(result);
    }

    //Get All Sales Staff
    //PASSED
    @GetMapping("/getAllSalesStaff")
    public ResponseEntity<?> getAllSalesStaff() {
        return ResponseEntity.ok(salesStaffService.getAllSalesStaff());
    }

    //Get Sale Staff By Id
    //PASSED
    @GetMapping("/getSalesStaffById/{id}")
    public ResponseEntity<?> getSalesStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(salesStaffService.getSalesStaffById(id));
    }

    //UPDATE SALES STAFF
    //PASSED
    @PutMapping("/updateSalesStaffById/{id}")
    public ResponseEntity<?> updateSalesStaff(@PathVariable Long id, @RequestBody SalesStaff salesStaff) {
        return ResponseEntity.ok(salesStaffService.updateSalesStaff(id, salesStaff.getEmail(), salesStaff.getPhoneNumber())) ;
    }

    //DELETE SALES STAFF
    //PASSED
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSalesStaff(@PathVariable Long id) {
        if(salesStaffService.getSalesStaffById(id).isPresent()){
            salesStaffService.deleteSalesStaffById(id);
            return ResponseEntity.ok("Sales Staff deleted successfully");
        }
        return ResponseEntity.ok("Sales Staff not found");
    }

    //Confirm Order
    @PostMapping("/confirm-order/{id}")
    public ResponseEntity<?> confirmOrder(@PathVariable Long id) {
        boolean isConfirmed = orderService.confirmOrder(id);

        if (isConfirmed) {
            return ResponseEntity.ok("Order with ID " + id + " has been confirmed and updated to POSTED.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order with ID " + id + " cannot be confirmed.");
        }
    }

    //
    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long id) {
        boolean isCancelled = orderService.cancelOrder(id);
        if (isCancelled) {
            return ResponseEntity.ok("Order cancelled successfully.");
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/confirmReceived/{id}")
    public ResponseEntity<String> confirmReceivedOrder(@PathVariable Long id) {
        boolean isConfirmed = orderService.confirmReceivedOrder(id);
        if (isConfirmed) {
            return ResponseEntity.ok("Received order confirmed successfully.");
        }
        return ResponseEntity.notFound().build();
    }



}
