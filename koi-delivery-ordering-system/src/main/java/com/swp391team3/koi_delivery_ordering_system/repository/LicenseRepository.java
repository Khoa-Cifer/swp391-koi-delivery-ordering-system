package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.License;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;

public interface LicenseRepository extends JpaRepository<License, Long> {
    @Query("UPDATE License l SET l.name = :name, l.type = :type, l.description = :description, l.dateOfIssue = :dateOfIsDate WHERE l.id = :id")
    License updateLicense(long id, String name, String type, String description, Date dateOfIsDate);
}
