package com.swp391team3.koi_delivery_ordering_system.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.swp391team3.koi_delivery_ordering_system.model.License;

public interface LicenseRespository extends JpaRepository<License, Long>, CrudRepository<License, Long> {

    @Query("UPDATE License SET name = :name, description = :description WHERE id = :id")
    License updateById(long id, String name, String description);
}