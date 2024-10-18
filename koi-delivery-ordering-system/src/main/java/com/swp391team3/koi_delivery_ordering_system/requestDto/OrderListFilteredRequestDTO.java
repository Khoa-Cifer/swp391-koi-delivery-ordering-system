package com.swp391team3.koi_delivery_ordering_system.requestDto;

import lombok.Getter;

@Getter
public class OrderListFilteredRequestDTO {
    private Long customerId;
    private int status;
}
