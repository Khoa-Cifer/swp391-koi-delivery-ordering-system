package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.OrderPaymentHistory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentHistoryRepository extends JpaRepository<OrderPaymentHistory, Long> {
    @Query("SELECT oph FROM OrderPaymentHistory oph WHERE oph.customer.id = :customerId AND oph.amount = :amount ORDER BY oph.id DESC")
    List<OrderPaymentHistory> findPaymentHistoriesByCustomerIdAndAmount(Long customerId, double amount);
}
