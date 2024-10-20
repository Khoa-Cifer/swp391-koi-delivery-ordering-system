package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Fish;
import com.swp391team3.koi_delivery_ordering_system.model.Order;
import com.swp391team3.koi_delivery_ordering_system.requestDto.OrderFishInfoRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IFileService;
import com.swp391team3.koi_delivery_ordering_system.service.IFishService;
import com.swp391team3.koi_delivery_ordering_system.service.IOrderService;
import com.swp391team3.koi_delivery_ordering_system.utils.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/fishes")
@RequiredArgsConstructor
public class FishController {
    private final IFishService fishService;
    private final IOrderService orderService;
    private final OrderStatus orderStatus;
    private final IFileService fileService;

    //Get All Fish
    @GetMapping("/getAllFishes")
    public List<Fish> getAllFishes() {
        return fishService.getAllFishs();
    }

    @PostMapping(value = "/createFishByOrderId", consumes = "multipart/form-data")
    public Long createFishOrder(
            @RequestParam("fishName") String fishName,
            @RequestParam("fishAge") int fishAge,
            @RequestParam("fishSize") double fishSize,
            @RequestParam("fishWeight") double fishWeight,
            @RequestParam("fishPrice") double fishPrice,
            @RequestParam("fishImage") MultipartFile fishImage,
            @RequestParam("orderId") Long orderId) throws IOException {

        // Create a new OrderFishInfoRequestDTO
        OrderFishInfoRequestDTO request = new OrderFishInfoRequestDTO();
        request.setFishName(fishName);
        request.setFishAge(fishAge);
        request.setFishSize(fishSize);
        request.setFishWeight(fishWeight);
        request.setFishPrice(fishPrice);
        request.setFishImage(fishImage);
        request.setOrderId(orderId);
        return fishService.createFishByOrderId(request);
    }

    @GetMapping("/getFishByOrderId/{orderId}")
    public ResponseEntity<List<Fish>> getFishesByOrderId(@PathVariable("orderId") Long orderId) {
        return ResponseEntity.ok(fishService.getFishesByOrderId(orderId));
    }

    @PutMapping("/update-fish-status/{id}/{status}")
    public ResponseEntity<?> updateFishStatus(@PathVariable Long id, @PathVariable int status) {
        return ResponseEntity.ok(fishService.updateFishStatus(id, status));
    }

    @GetMapping("/getFishById")
    public Fish getFishById(@RequestParam("id") Long id) {
        return fishService.getFishById(id).get();
    }

    @DeleteMapping("/delete-fish/{id}")
    public ResponseEntity<?> deleteFish(@PathVariable("id") Long id) {
        return ResponseEntity.ok(fishService.deleteFishById(id));
    }

//    @PostMapping(value = "/editFish/{id}")
//    public ResponseEntity<?> editFish(
//            @PathVariable("id") Long fishId,
//            @RequestParam(name = "name") String name,
//            @RequestParam(name = "age") int age,
//            @RequestParam(name = "size") double size,
//            @RequestParam(name = "weight") double weight,
////            @RequestParam(name = "status") int status,
//            @RequestParam(name = "price") double price,
//            @RequestParam(name = "image") MultipartFile file) {
//
//
//        Optional<Fish> optionalFish = fishService.getFishById(fishId);
//
//        if (optionalFish.isPresent()) {
//            Fish fish = optionalFish.get();
//
//            Optional<Order> orderOptional = orderService.getOrderById(fish.getOrder().getId());
//
//            if (!orderOptional.isPresent()) {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The order does not exist");
//            }
//            Order order = orderOptional.get();
//            if (order.getOrderStatus() == orderStatus.DRAFT || order.getOrderStatus() == orderStatus.POSTED) {
//                Fish updatedFish = fishService.updateFish(fishId, name, age, size, weight, price, file);
//                return ResponseEntity.ok(updatedFish);
//            } else {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Order Status does not support");
//            }
//        }
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The fish does not exist");
//    }
}
