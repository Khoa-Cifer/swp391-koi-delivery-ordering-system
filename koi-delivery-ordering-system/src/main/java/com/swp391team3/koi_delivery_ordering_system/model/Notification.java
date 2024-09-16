package com.swp391team3.koi_delivery_ordering_system.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private Date sendDate;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private Manager sender;

    @ManyToOne
    @JoinColumn(name = "sales_receiver_id", nullable = false)
    private SalesStaff salesNoti;

    @ManyToOne
    @JoinColumn(name = "customer_receiver_id", nullable = false)
    private Customer customerNoti;

    @ManyToOne
    @JoinColumn(name = "deliverer_receiver_id", nullable = false)
    private DeliveryStaff driverNoti;
}