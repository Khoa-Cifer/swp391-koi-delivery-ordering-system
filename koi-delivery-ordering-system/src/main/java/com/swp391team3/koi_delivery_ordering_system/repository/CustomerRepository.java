package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long>, CrudRepository<Customer, Long> {
    boolean existsByEmail(String email);

    @Query("SELECT c FROM Customer c WHERE c.email like :email")
    Customer findCustomerByEmail(String email);
    @Query("UPDATE Customer SET email = :email, password = :password WHERE id = :id")
    Customer updateCustomerById(long id, String email, String password);
}
