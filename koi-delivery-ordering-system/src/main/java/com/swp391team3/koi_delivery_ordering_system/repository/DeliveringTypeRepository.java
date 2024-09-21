package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveringType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeliveringTypeRepository extends JpaRepository<DeliveringType, Long> {
    @Query("UPDATE DeliveringType dt SET dt.name = :name, dt.description = :description WHERE dt.id = :id")
    DeliveringType updateDeliveringType(Long id, String name, String description);
}
