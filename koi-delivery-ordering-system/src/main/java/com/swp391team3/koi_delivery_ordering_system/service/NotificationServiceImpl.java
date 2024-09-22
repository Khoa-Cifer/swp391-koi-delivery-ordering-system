package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;
import com.swp391team3.koi_delivery_ordering_system.model.Notification;
import com.swp391team3.koi_delivery_ordering_system.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements INotificationService {
    private final NotificationRepository notificationRepository;



    @Override
    public boolean createNotification(String name, String description, Date sendDate, Manager sender, Long receive) {
        try {
            Notification notification = new Notification();
            notification.setName(name);
            notification.setDescription(description);
            notification.setSendDate(sendDate);
            notification.setSender(sender);
            notification.setReceiver(receive);

            notificationRepository.save(notification);
            return true;
        } catch (Exception e) {
           return false;
        }
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public Optional<Notification> getNotificationById(Long id) {
        return notificationRepository.findById(id);
    }

    @Override
    public void deleteNotificationById(Long id) {
        notificationRepository.deleteById(id);
    }
}
