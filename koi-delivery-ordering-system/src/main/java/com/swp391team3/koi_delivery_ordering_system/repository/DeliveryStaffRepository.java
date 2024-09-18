package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface DeliveryStaffRepository extends JpaRepository<DeliveryStaff, Long>, CrudRepository<DeliveryStaff, Long> {
    boolean existsByEmail(String email);

    @Query("SELECT ds FROM DeliveryStaff ds WHERE ds.email like :email")
    DeliveryStaff findDeliveryStaffByEmail(String email);
    @Query("UPDATE DeliveryStaff SET email = :email, password = :password WHERE id = :id")
    DeliveryStaff updateDeliveryStaffById(long id, String email, String password);
}
