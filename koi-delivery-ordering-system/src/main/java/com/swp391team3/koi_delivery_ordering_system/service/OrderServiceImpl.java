package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderFishInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.utils.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderStatus orderStatus;

    @Override
    public Long createGeneralInfoOrder(OrderGeneralInfoRequestDTO dto) {
        Order newOrder = new Order();
        Optional<Customer> orderCreator = customerRepository.findById(dto.getCustomerId());
        newOrder.setCustomer(orderCreator.get());
        System.out.println(dto.getName());
        newOrder.setName(dto.getName());
        newOrder.setDescription(dto.getDescription());
        newOrder.setDestinationAddress(dto.getDestinationAddress());
        newOrder.setLatitude(dto.getLatitude());
        newOrder.setLongitude(dto.getLongitude());

        //Created date
        newOrder.setCreatedDate(new Date());
        Order savedOrder = orderRepository.save(newOrder);
        //return order's id for next step
        return savedOrder.getId();
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public void deleteOrderById(Long id) {
        orderRepository.deleteById(id);
    }
}
