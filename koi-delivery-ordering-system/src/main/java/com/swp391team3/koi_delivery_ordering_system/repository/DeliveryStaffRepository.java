package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DeliveryStaffRepository extends JpaRepository<DeliveryStaff, Long> {
    boolean existsByEmail(String email);

    @Query("SELECT ds FROM DeliveryStaff ds WHERE ds.email like :email")
    DeliveryStaff findDeliveryStaffByEmail(String email);
}
