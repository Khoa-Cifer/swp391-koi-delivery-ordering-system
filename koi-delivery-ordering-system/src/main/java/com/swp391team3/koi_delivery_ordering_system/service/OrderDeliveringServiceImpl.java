package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.DeliveryStaff;
import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.model.OrderDelivering;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderDeliveringRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderDeliveringInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.utils.OrderStatus;
import com.swp391team3.koi_delivery_ordering_system.utils.ProcessType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderDeliveringServiceImpl implements IOrderDeliveringService {
    private final OrderDeliveringRepository orderDeliveringRepository;
    private final OrderRepository orderRepository;
    private final DeliveryStaffRepository deliveryStaffRepository;
    private final ProcessType processType;
    private final OrderStatus orderStatus;
    private final IOrderService orderService;

    @Override
    public void generateOrderGetting(Order order, DeliveryStaff deliveryStaff) {
        OrderDelivering orderDelivering = new OrderDelivering();

        orderDelivering.setCreatedDate(new Date());
        orderDelivering.setLastUpdatedDate(new Date());

        orderDelivering.setOrder(order);
        orderDelivering.setDriver(deliveryStaff);

        orderDelivering.setCurrentAddress(order.getSenderAddress());
        orderDelivering.setLongitude(order.getSenderLongitude());
        orderDelivering.setLatitude(order.getSenderLatitude());
        orderDelivering.setDeliveryProcessType(processType.GETTING);


        orderDeliveringRepository.save(orderDelivering);
    }

    @Override
    public boolean startGetting(Long orderId, Long driverId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        Optional<DeliveryStaff> optionalDeliveryStaff = deliveryStaffRepository.findById(driverId);
        if (optionalOrder.isPresent() && optionalDeliveryStaff.isPresent()) {
            Order order = optionalOrder.get();
            orderService.updateOrderStatus(orderId, orderStatus.ORDER_GETTING);
            DeliveryStaff deliveryStaff = optionalDeliveryStaff.get();
            generateOrderGetting(order, deliveryStaff);
            return true;
        }
        return false;
    }
}
