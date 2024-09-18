package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDeliverer;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ThirdDelivererRepository extends JpaRepository<ThirdDeliverer, Long>, CrudRepository<ThirdDeliverer, Long> {
    @Query("UPDATE ThirdDeliverer SET name = :name, type = :type, priceRate = :priceRate WHERE id = :id")
    ThirdDeliverer updateThirdDelivererById(long id, String name, String type, double priceRate);
}
