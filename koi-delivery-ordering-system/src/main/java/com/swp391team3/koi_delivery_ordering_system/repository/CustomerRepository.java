package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
    boolean existsByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE c.email like :email")
    Customer findCustomerByEmail(String email);
    
}
