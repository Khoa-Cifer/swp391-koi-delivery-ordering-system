package com.swp391team3.koi_delivery_ordering_system.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.swp391team3.koi_delivery_ordering_system.model.Manager;

public interface ManagerRepository extends JpaRepository<Manager, Long>, CrudRepository<Manager, Long>{
    @Query("UPDATE Manager SET email = :email, password = :password WHERE id = :id")
    Manager updateManagerById(long id, String email, String password);
}
