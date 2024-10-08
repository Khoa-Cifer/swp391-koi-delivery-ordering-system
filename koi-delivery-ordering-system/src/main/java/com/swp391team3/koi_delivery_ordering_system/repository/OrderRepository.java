package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
    List<Order> findByOrderStatus(int status);

    @Query("SELECT o FROM OrderDelivering od JOIN od.order o " +
            "WHERE od.order.id = :orderId " +
            "AND od.driver.id = :deliveryStaffId " +
            "AND od.deliveryProcessType = :deliveryProcessType " +
            "AND od.finishDate IS NULL")
    Optional<Order> findOrderByDeliveryStaffId(Long deliveryStaffId, Long orderId, int deliveryProcessType);
}
