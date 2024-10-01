package com.swp391team3.koi_delivery_ordering_system.utils;

import lombok.Getter;
import org.springframework.stereotype.Component;

@Component
public class OrderStatus {
    public final int DRAFT = 0;
    public final int POSTED = 1;
    public final int ORDER_RECEIVED = 2;
    public final int ORDER_CONFIRMED = 3;
    public final int DELIVERING = 4;
    public final int COMPLETE = 5;
    public final int FAILED = 6;
}
