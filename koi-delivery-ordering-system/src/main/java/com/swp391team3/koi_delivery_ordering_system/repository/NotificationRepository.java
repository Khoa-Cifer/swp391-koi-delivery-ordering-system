package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long>, CrudRepository<Notification, Long> {
}
