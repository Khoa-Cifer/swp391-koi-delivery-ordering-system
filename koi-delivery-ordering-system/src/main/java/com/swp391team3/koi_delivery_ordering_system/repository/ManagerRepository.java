package com.swp391team3.koi_delivery_ordering_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
    boolean existsByEmail(String email);

    Manager findByEmail(String email);
}
