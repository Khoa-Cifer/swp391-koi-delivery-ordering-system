package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.ThirdDeliverer;
import com.swp391team3.koi_delivery_ordering_system.model.ThirdDelivererOrder;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface ThirdDelivererOrderRepository extends JpaRepository<ThirdDelivererOrder, Long>, CrudRepository<ThirdDelivererOrder, Long> {
  @Query("UPDATE ThirdDelivererOrder SET deliverer = :deliverer WHERE id = :id")
  ThirdDelivererOrder updateById(long id, ThirdDeliverer thirdDeliverer);
}
