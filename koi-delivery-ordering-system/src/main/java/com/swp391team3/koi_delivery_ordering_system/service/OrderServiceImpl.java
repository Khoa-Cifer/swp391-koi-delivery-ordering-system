package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.*;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderGeneralInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.utils.Utilities;
import com.swp391team3.koi_delivery_ordering_system.utils.OrderStatus;
import lombok.RequiredArgsConstructor;
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
    private final IStorageService storageService;

    public Long createGeneralInfoOrder(OrderGeneralInfoRequestDTO dto) {
        Order newOrder = new Order();
        Optional<Customer> orderCreator = customerRepository.findById(dto.getCustomerId());
        newOrder.setCustomer(orderCreator.get());

        newOrder.setName(dto.getName());
        newOrder.setDescription(dto.getDescription());

        newOrder.setDestinationAddress(dto.getDestinationAddress());
        newOrder.setDestinationLatitude(dto.getDestinationLatitude());
        newOrder.setDestinationLongitude(dto.getDestinationLongitude());

        newOrder.setSenderAddress(dto.getSenderAddress());
        newOrder.setSenderLatitude(dto.getSenderLatitude());
        newOrder.setSenderLongitude(dto.getSenderLongitude());

        newOrder.setExpectedFinishDate(dto.getExpectedFinishDate());

        newOrder.setOrderStatus(orderStatus.DRAFT); //0 is not used, 1 is completed
        //Created date
        newOrder.setCreatedDate(new Date());
        Order savedOrder = orderRepository.save(newOrder);
        //Based on the order's id, generate the tracking code
        String trackingCode = Utilities.generateOrderCode("OD", savedOrder.getId());
        savedOrder.setTrackingId(trackingCode);
        orderRepository.save(newOrder);
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

    @Override
    public Optional<Order> filterOrderToStorage(Long id) {
        Optional<Order> foundedOrder = getOrderById(id);
        List<Storage> allStorages = storageService.getAllStorages();

        double minDistance = Double.MAX_VALUE;
        Storage nearestStorage = null;

        for (int index = 0; index < allStorages.size(); index++) {
            double orderLat = Double.parseDouble(foundedOrder.get().getSenderLatitude());
            double orderLong = Double.parseDouble(foundedOrder.get().getSenderLongitude());
            double storageLat = Double.parseDouble(allStorages.get(index).getLatitude());
            double storageLong = Double.parseDouble(allStorages.get(index).getLongitude());
            double distance = Utilities.calculateDistance(
                    orderLat, orderLong, storageLat, storageLong);
            if (distance <= 50) {
                if (minDistance > distance) {
                    minDistance = distance;
                    nearestStorage = allStorages.get(index);
                }
            }
        }

        if (nearestStorage != null) {
            foundedOrder.get().setStorage(nearestStorage);
            orderRepository.save(foundedOrder.get());
        }
        return foundedOrder;
    }

    @Override
    public boolean postOrder(Long id) {
        Optional<Order> completeOrder = orderRepository.findById(id);
        completeOrder.get().setOrderStatus(orderStatus.POSTED);
        orderRepository.save(completeOrder.get());
        return true;
    }

    @Override
    public boolean cancelOrder(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setOrderStatus(orderStatus.FAILED);
            orderRepository.save(order);
            return true;
        }
        return false;
    }

    @Override
    public boolean confirmOrder(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getOrderStatus() == orderStatus.POSTED) { // Kiểm tra trạng thái hiện tại
                order.setOrderStatus(orderStatus.ORDER_ACCEPTED); // Chuyển trạng thái thành ORDER_ACCEPTED
                orderRepository.save(order);
                return true; // Thành công
            }
        }
        return false; // Không thành công
    }

    @Override
    public boolean deliveryPickup(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getOrderStatus() == orderStatus.ORDER_ACCEPTED) { // Kiểm tra trạng thái hiện tại
                order.setOrderStatus(orderStatus.ORDER_GETTING); // Chuyển trạng thái thành ORDER_ACCEPTED
                orderRepository.save(order);
                return true; // Thành công
            }
        }
        return false; // Không thành công
    }

    @Override
    public boolean receiveOrder(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getOrderStatus() == orderStatus.ORDER_GETTING) { // Kiểm tra trạng thái hiện tại
                order.setOrderStatus(orderStatus.ORDER_RECEIVED); // Chuyển trạng thái thành ORDER_ACCEPTED
                orderRepository.save(order);
                return true; // Thành công
            }
        }
        return false; // Không thành công
    }

    @Override
    public boolean confirmReceivedOrder(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getOrderStatus() == orderStatus.ORDER_RECEIVED) { // Kiểm tra trạng thái hiện tại
                order.setOrderStatus(orderStatus.ORDER_CONFIRMED); // Chuyển trạng thái thành ORDER_ACCEPTED
                orderRepository.save(order);
                return true; // Thành công
            }
        }
        return false; // Không thành công
    }


    @Override
    public List<Order> getOrderByStatus(int status) {
        List<Order> orders = orderRepository.findByOrderStatus(status);
        return orders;
    }
}
