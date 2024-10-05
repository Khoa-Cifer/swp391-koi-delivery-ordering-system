package com.swp391team3.koi_delivery_ordering_system.service;


import com.swp391team3.koi_delivery_ordering_system.model.Customer;
import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.model.OrderPaymentHistory;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.PaymentHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentHistoryServiceImpl implements IPaymentHistoryService {
    private final PaymentHistoryRepository paymentHistoryRepository;
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    @Override
    public List<OrderPaymentHistory> getAllPaymentHistory() {
        return paymentHistoryRepository.findAll();
    }

    @Override
    public Optional<OrderPaymentHistory> getPaymentHistoryById(Long id) {
        return paymentHistoryRepository.findById(id);
    }

    @Override
    public OrderPaymentHistory updatePaymentHistory(Long id) {
//        OrderPaymentHistory orderPaymentHistory = paymentHistoryRepository.findById(id).get();
//        if(orderPaymentHistory != null) {
//            orderPaymentHistory.setDescription(description);
//            return paymentHistoryRepository.save(orderPaymentHistory);
//        }
        return null;
    }

    @Override
    public boolean logPaymentHistory(double amount, Long orderId, Long customerId) {
        OrderPaymentHistory paymentHistory = new OrderPaymentHistory();
        paymentHistory.setAmount(amount);
        Optional<Customer> customer = customerRepository.findById(customerId);
        Optional<Order> order = orderRepository.findById(orderId);
        paymentHistory.setCustomer(customer.get());
        paymentHistory.setOrder(order.get());
        paymentHistoryRepository.save(paymentHistory);
        return true;
    }
}
