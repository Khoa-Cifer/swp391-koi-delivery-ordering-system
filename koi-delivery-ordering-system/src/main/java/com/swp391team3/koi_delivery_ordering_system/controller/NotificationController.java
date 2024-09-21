package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Notification;
import com.swp391team3.koi_delivery_ordering_system.service.INotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final INotificationService notificationService;

    //Create Notification
    //PASSED
    @PostMapping
    public ResponseEntity<?> createNotification(@RequestBody Notification notification) {
       boolean result = notificationService.createNotification(notification.getName(), notification.getDescription(), notification.getSendDate(), notification.getSender(), notification.getReceiver());
       if(result) {
           return ResponseEntity.ok("Notification created successfully!");
       } else {
           return ResponseEntity.badRequest().body("Notification creation failed!");
       }
    }

    //Get All Notifications
    //PASSED
    @GetMapping
    public ResponseEntity<?> getAllNotifications() {
        List<Notification> notifications = notificationService.getAllNotifications();
        return ResponseEntity.ok(notifications);
    }

    //Get Notification By Id
    //PASSED
    @GetMapping("/{id}")
    public ResponseEntity<?> getNotificationById(@PathVariable Long id) {
        Optional<Notification> notification = notificationService.getNotificationById(id);
        return ResponseEntity.ok(notification);
    }

    //Delete Notification
    //PASSED
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotificationById(@PathVariable Long id) {
        notificationService.deleteNotificationById(id);
        return ResponseEntity.ok("Notification deleted successfully!");
    }
}
