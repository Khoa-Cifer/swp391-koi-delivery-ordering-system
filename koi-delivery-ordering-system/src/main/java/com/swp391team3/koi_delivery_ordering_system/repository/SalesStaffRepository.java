package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.SalesStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SalesStaffRepository  extends JpaRepository<SalesStaff, Long>, CrudRepository<SalesStaff, Long> {
    boolean existsByEmail(String email);

    @Query("SELECT ss FROM SalesStaff ss WHERE ss.email like :email")
    SalesStaff findSalesStaffByEmail(String email);
}
