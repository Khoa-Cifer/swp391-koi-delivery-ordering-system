package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.OrderPaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentHistoryRepository extends JpaRepository<OrderPaymentHistory, Long> {
}
