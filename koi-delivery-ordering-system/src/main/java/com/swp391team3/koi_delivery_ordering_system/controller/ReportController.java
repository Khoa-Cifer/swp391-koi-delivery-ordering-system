package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.service.IReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final IReportService reportService;

    @GetMapping("/get-total-orders")
    public ResponseEntity<?> getTotalOrdersReport() {
        return ResponseEntity.ok(reportService.getTotalOrdersInfo());
    }

    @GetMapping("/get-delivery-staff-report/{id}")
    public ResponseEntity<?> getDeliveryStaffInfoReport(@PathVariable Long id) {
        return ResponseEntity.ok(reportService.getDeliveryStaffReport(id));
    }
}
