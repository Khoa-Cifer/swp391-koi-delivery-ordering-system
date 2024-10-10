package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.requestDto.DeliveryStaffLocationUpdateRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.StaffRequestCreationDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IDeliveryStaffService;
import com.swp391team3.koi_delivery_ordering_system.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/deliveryStaff")
@RequiredArgsConstructor
public class DeliveryStaffController {
    private final IDeliveryStaffService deliveryStaffService;

    private final IOrderService orderService;

    @PostMapping("/createDeliveryStaff")
    public ResponseEntity<?> createDeliveryStaff(@RequestBody StaffRequestCreationDTO request) {
        String result = deliveryStaffService.createDeliveryStaff(request.getEmail(), request.getUsername());
        return ResponseEntity.ok(result);
    }

    //Get All Delivery Staff
    //PASSED
    @GetMapping("/getAllDeliveryStaff")
    public ResponseEntity<?> getAllDeliveryStaff() {
        return ResponseEntity.ok(deliveryStaffService.getAllDeliveryStaffs());
    }

    //Get Delivery Staff By Id
    //PASSED
    @GetMapping("/getDeliveryStaffById/{id}")
    public ResponseEntity<?> getDeliveryStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryStaffService.getDeliveryStaffById(id));
    }

    //Delete Delivery Staff
    //PASSED
    @DeleteMapping("/deleteDeliveryStaffById/{id}")
    public void deleteDeliveryStaff(@PathVariable Long id) {
        deliveryStaffService.deleteDeliveryStaffById(id);
    }

    //Update Delivery Staff
    //PASSED
    @PutMapping("/updateDeliveryStaffById/{id}")
    public ResponseEntity<?> updateDeliveryStaff(@PathVariable Long id, @RequestBody DeliveryStaff deliveryStaff) {
        return ResponseEntity.ok(deliveryStaffService.updateDeliveryStaffById(id, deliveryStaff.getEmail(), deliveryStaff.getPhoneNumber()));
    }
//    @PostMapping("/startDelivery/{id}")
//    public ResponseEntity<?> startDelivery(@PathVariable Long id, @RequestBody Long driverId) {
//        if(orderService.startDelivery(id, driverId)){
//            return ResponseEntity.ok("Delivering order");
//        }
//        return ResponseEntity.badRequest().build();
//    }
//

    @PutMapping("/updateDeliveryStaffLocation")
    public ResponseEntity<?> updateDeliveryStaffLocation(@RequestBody DeliveryStaffLocationUpdateRequestDTO request) {
        return ResponseEntity.ok(deliveryStaffService.updateDeliveryStaffLocation(request));
    }
}
