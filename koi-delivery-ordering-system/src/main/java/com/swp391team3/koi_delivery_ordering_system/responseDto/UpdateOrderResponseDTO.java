package com.swp391team3.koi_delivery_ordering_system.responseDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateOrderResponseDTO {
    private Long orderId;
    private double price;
}
