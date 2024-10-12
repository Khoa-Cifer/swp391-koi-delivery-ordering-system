package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.config.thirdParty.EmailService;
import com.swp391team3.koi_delivery_ordering_system.model.*;
import com.swp391team3.koi_delivery_ordering_system.repository.CustomerRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.DeliveryStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.OrderRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.*;
import com.swp391team3.koi_delivery_ordering_system.utils.PriceBoard;
import com.swp391team3.koi_delivery_ordering_system.utils.Utilities;
import com.swp391team3.koi_delivery_ordering_system.utils.OrderStatus;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements IOrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderStatus orderStatus;
    private final IStorageService storageService;
    private final IFishService fishService;
    private final PriceBoard priceBoard;
    private final DeliveryStaffRepository deliveryStaffRepository;
    private final ISalesStaffService salesStaffService;
    private final EmailService emailService;
    private final IOrderDeliveringService orderDeliveringService;
    private final IDeliveryStaffService deliveryStaffService;
    private final IPaymentRateService paymentRateService;

    @Autowired
    public OrderServiceImpl
            (OrderRepository orderRepository,
             CustomerRepository customerRepository,
             OrderStatus orderStatus, IStorageService storageService,
             IFishService fishService, PriceBoard priceBoard, DeliveryStaffRepository deliveryStaffRepository,
             ISalesStaffService salesStaffService, EmailService emailService,
             @Lazy IOrderDeliveringService orderDeliveringService,
             IDeliveryStaffService deliveryStaffService, IPaymentRateService paymentRateService) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.orderStatus = orderStatus;
        this.storageService = storageService;
        this.fishService = fishService;
        this.priceBoard = priceBoard;
        this.deliveryStaffRepository = deliveryStaffRepository;
        this.salesStaffService = salesStaffService;
        this.emailService = emailService;
        this.orderDeliveringService = orderDeliveringService;
        this.deliveryStaffService = deliveryStaffService;
        this.paymentRateService = paymentRateService;
    }

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
            String[] senderAddress = foundedOrder.get().getSenderAddress().split(",");
            String[] storageAddress = allStorages.get(index).getAddress().split(",");
            String senderCountry = senderAddress[senderAddress.length - 1].trim();
            String storageCountry = storageAddress[storageAddress.length - 1].trim();
            boolean distanceResult = Utilities.compareCountry(senderCountry, storageCountry);
            if (distance <= 50 && distanceResult) {
                if (minDistance > distance) {
                    minDistance = distance;
                    nearestStorage = allStorages.get(index);
                }
            }
        }

        if (nearestStorage != null) {
            foundedOrder.get().setStorage(nearestStorage);
            nearestStorage.setOrderAmount(nearestStorage.getOrderAmount() + 1);
            orderRepository.save(foundedOrder.get());
        }

        return foundedOrder;
    }

    @Override
    public boolean postOrder(Long id) {
        Optional<Order> completeOrder = getOrderById(id);
        completeOrder.get().setOrderStatus(orderStatus.POSTED);
        orderRepository.save(completeOrder.get());
        return true;
    }

    @Override
    public boolean updateOrderStatus(Long id, int newStatus) {
        Optional<Order> optionalOrder = getOrderById(id);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            int currentStatus = order.getOrderStatus();

            switch (newStatus) {
                case 2:
                    if (currentStatus == orderStatus.POSTED) {
                        order.setOrderStatus(orderStatus.ORDER_ACCEPTED);
                    } else {
                        return false;
                    }
                    break;
                case 3:
                    if (currentStatus == orderStatus.ORDER_ACCEPTED) {
                        order.setOrderStatus(orderStatus.ORDER_GETTING);
                    } else {
                        return false;
                    }
                    break;
                case 4:
                    if (currentStatus == orderStatus.ORDER_GETTING) {
                        order.setOrderStatus(orderStatus.ORDER_RECEIVED);
                    } else {
                        return false;
                    }
                    break;
                case 5:
                    if (currentStatus == orderStatus.ORDER_RECEIVED) {
                        order.setOrderStatus(orderStatus.ORDER_CONFIRMED);
                    } else {
                        return false;
                    }
                    break;
                case 6:
                    if (currentStatus == orderStatus.ORDER_CONFIRMED) {
                        order.setOrderStatus(orderStatus.DELIVERING);
                    } else {
                        return false;
                    }
                    break;
                case 7:
                    if (currentStatus == orderStatus.DELIVERING) {
                        order.setOrderStatus(orderStatus.COMPLETE);
                    } else {
                        return false;
                    }
                    break;
                case 8:
                    order.setOrderStatus(orderStatus.FAILED);
                    break;
                default:
                    return false;
            }

            orderRepository.save(order);
            return true;
        }
        return false;
    }

    @Override
    public List<Order> getOrderByStatus(int status) {
        List<Order> orders = orderRepository.findByOrderStatus(status);
        return orders;
    }

    @Override
    public double calculateOrderPrice(Long id) {
        List<Fish> fishList = fishService.getFishesByOrderId(id);
        Optional<Order> order = getOrderById(id);
        double distance = Utilities.calculateDistance(
                Double.parseDouble(order.get().getSenderLatitude()),
                Double.parseDouble(order.get().getSenderLongitude()),
                Double.parseDouble(order.get().getDestinationLatitude()),
                Double.parseDouble(order.get().getDestinationLongitude())
        );

        double price = getPrice(fishList, order, distance);
        order.get().setPrice(price);
        orderRepository.save(order.get());
        return price;
    }

    @Override
    public List<Order> findOrdersForDelivery(Long id) {
        Optional<DeliveryStaff> optionalDeliveryStaff = deliveryStaffRepository.findById(id);
        if(optionalDeliveryStaff.isPresent()) {
            DeliveryStaff deliveryStaff = optionalDeliveryStaff.get();

            List<Order> orders = orderRepository.findByOrderStatus(2);

            List<Order> result = orders.stream()
                    .filter(order -> Utilities.calculateDistance(
                            Double.parseDouble(deliveryStaff.getLatitude()),
                            Double.parseDouble(deliveryStaff.getLongitude()),
                            Double.parseDouble(order.getSenderLatitude()),
                            Double.parseDouble(order.getSenderLongitude())) <= 40)
                    .sorted(Comparator.comparingDouble(order ->
                            Utilities.calculateDistance(
                                    Double.parseDouble(deliveryStaff.getLatitude()),
                                    Double.parseDouble(deliveryStaff.getLongitude()),
                                    Double.parseDouble(order.getSenderLatitude()),
                                    Double.parseDouble(order.getSenderLongitude()))))
                    .limit(5)
                    .collect(Collectors.toList());

            return result;
        }
        return null;
    }

    @Override
    public List<Order> onGoingOrdersForDelivery(Long id, int deliveryProcessType) {
        List<Order> gettingOrder = getOrderByStatus(orderStatus.ORDER_GETTING);
        List<Order> onGoingOrder = new ArrayList<>();
        for (int i = 0; i < gettingOrder.size(); i++) {
            Optional<Order> foundOrder = orderRepository.findOrderByDeliveryStaffId(id, gettingOrder.get(i).getId(), deliveryProcessType);
            foundOrder.ifPresent(onGoingOrder::add);
        }
        return onGoingOrder;
    }

    @Override
    public boolean updateOrderSalesAction(Long orderId, Long salesId, int action) {
        Optional<Order> foundedOrder = getOrderById(orderId);
        Optional<SalesStaff> foundedSalesStaff = salesStaffService.getSalesStaffById(salesId);
        switch(action) {
            case 0:
                foundedOrder.get().setSalesStaffAccept(foundedSalesStaff.get());
                break;
            case 1:
                foundedOrder.get().setSalesStaffConfirmation(foundedSalesStaff.get());
                break;
            case 2:
                foundedOrder.get().setSalesStaffCancellation(foundedSalesStaff.get());
                break;
            default:
                return false;
        }
        orderRepository.save(foundedOrder.get());
        return true;
    }

    @Override
    public Optional<Order> getOrderByTrackingId(String trackingId) {
        return orderRepository.findByTrackingId(trackingId);
    }

    @Override
    public boolean finishOrder(FinishOrderUpdateRequestDTO request) {
        try {
            boolean result = false;

            Optional<Storage> foundStorage = storageService.getStorageById(request.getStorageId());
            Optional<Order> foundOrder = getOrderById(request.getOrderId());
            Optional<OrderDelivering> foundOrderDelivering = orderDeliveringService.getOrderDeliveringById(request.getOrderDeliveringId());
            Optional<DeliveryStaff> foundDeliveryStaff = deliveryStaffService.getDeliveryStaffById(request.getDeliveryStaffId());

            boolean updatedOrder = updateOrderStatus(foundOrder.get().getId(), orderStatus.ORDER_RECEIVED);
            if (updatedOrder) {
                OrderDeliveringUpdateInfoRequestDTO dto = new OrderDeliveringUpdateInfoRequestDTO();
                dto.setOrderDeliveringId(foundOrderDelivering.get().getId());
                dto.setLatitude(foundStorage.get().getLatitude());
                dto.setLongitude(foundStorage.get().getLongitude());
                dto.setCurrentAddress(foundStorage.get().getAddress());

                OrderDelivering orderDeliveringResult = orderDeliveringService.updateDeliveringInfo(dto);
                if (orderDeliveringResult != null) {
                    DeliveryStaffLocationUpdateRequestDTO deliveryStaffDTO = new DeliveryStaffLocationUpdateRequestDTO();
                    deliveryStaffDTO.setId(foundDeliveryStaff.get().getId());
                    deliveryStaffDTO.setAddress(foundStorage.get().getAddress());
                    deliveryStaffDTO.setLatitude(foundStorage.get().getLatitude());
                    deliveryStaffDTO.setLongitude(foundStorage.get().getLongitude());

                    boolean updateResult = deliveryStaffService.updateDeliveryStaffLocation(deliveryStaffDTO);

                    if (updateResult) {
                        orderDeliveringService.finishDelivering(orderDeliveringResult.getId());
                        result = true;
                    }
                }
            }

            return result;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Order updateOrder(Long orderId, String name, String description, Date expectedFinishDate,
                             String destinationAddress, String destinationLongitude, String destinationLatitude,
                             String senderAddress, String senderLongitude, String senderLatitude) {

        Order order = orderRepository.findById(orderId).orElseThrow(() ->
                new RuntimeException("Order not found")
        );

        order.setName(name);
        order.setDescription(description);
        order.setExpectedFinishDate(expectedFinishDate);
        order.setDestinationAddress(destinationAddress);
        order.setDestinationLongitude(destinationLongitude);
        order.setDestinationLatitude(destinationLatitude);
        order.setSenderAddress(senderAddress);
        order.setSenderLongitude(senderLongitude);
        order.setSenderLatitude(senderLatitude);

        return orderRepository.save(order);
    }


    private double getPrice(List<Fish> fishList, Optional<Order> order, double distance) {
        String[] senderAddress = order.get().getSenderAddress().split(",");
        String[] receiverAddress = order.get().getDestinationAddress().split(",");
        String senderCountry = senderAddress[senderAddress.length - 1].trim();
        String receiverCountry = receiverAddress[receiverAddress.length - 1].trim();
        boolean distanceCheck = Utilities.compareCountry(senderCountry, receiverCountry);
//        double distancePrice = priceBoard.PRICE_BASE * distance;
        double distancePrice = paymentRateService.getPaymentServiceById(priceBoard.PRICE_BASE_ID).get().getRate();
//        double koiPrice = priceBoard.BOX_PRICE * numberOfBoxes;
        double koiPrice = paymentRateService.getPaymentServiceById(priceBoard.PRICE_RATE_KOI).get().getRate() * fishList.size();

        if (distanceCheck) {
//            distancePrice = distancePrice * priceBoard.PRICE_RATE_DOMESTIC;
            distancePrice = distancePrice * paymentRateService.getPaymentServiceById(priceBoard.PRICE_RATE_DOMESTIC_ID).get().getRate();
        } else {
//            distancePrice = distancePrice * priceBoard.PRICE_RATE_FOREIGN;
            distancePrice = distancePrice * paymentRateService.getPaymentServiceById(priceBoard.PRICE_RATE_FOREIGN_ID).get().getRate();
        }
        return distancePrice + koiPrice;
    }

}
