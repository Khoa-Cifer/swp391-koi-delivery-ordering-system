package com.swp391team3.koi_delivery_ordering_system.utils;

import org.springframework.stereotype.Component;

@Component
public class PriceBoard {
    public final int PRICE_BASE = 100000;
    public final double PRICE_RATE_DOMESTIC = 1.0;
    public final double PRICE_RATE_FOREIGN = 1.5;
    public final int BOX_PRICE = 5000;
}
