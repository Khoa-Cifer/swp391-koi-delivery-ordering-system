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
@Table(name = "order_delivering")
public class OrderDelivering {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int orderStatus;
    private Date createdDate;
    private Date lastUpdatedDate;
    private Date finishDate;
    private String destinationAddress;
    private String longitude;
    private String latitude;

    @ManyToOne
    @JoinColumn(name = "delivery_staff_id")
    private DeliveryStaff driver;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
