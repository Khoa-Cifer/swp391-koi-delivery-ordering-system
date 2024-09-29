package com.swp391team3.koi_delivery_ordering_system.model;

import lombok.Data;

@Data
public class EmailDetail {
    Object receiver;
    String subject;
    String link;
}