package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.model.Notification;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface INotificationService {
    public boolean createNotification(String name, String description, Date sendDate, Manager sender, Long receiver);
    public List<Notification> getAllNotifications();
    public Optional<Notification> getNotificationById(Long id);
    public void deleteNotificationById(Long id);
}
