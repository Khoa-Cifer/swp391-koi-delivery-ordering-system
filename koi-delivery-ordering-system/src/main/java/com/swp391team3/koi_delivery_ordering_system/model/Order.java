package com.swp391team3.koi_delivery_ordering_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String trackingId;
    private String name;
    private String description;
    private Date createdDate;
    private Date expectedFinishDate;
    private String destinationAddress;
    private String destinationLongitude;
    private String destinationLatitude;
    private String senderAddress;
    private String senderLongitude;
    private String senderLatitude;
    private double price;
    private int usedStatus;

    @ManyToOne
    @JoinColumn(name = "storage_id")
    private Storage storage;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private Set<OrderDelivering> orderDeliverings;

    @ManyToOne
    @JoinColumn(name = "sales_id")
    private SalesStaff salesStaff;

    @OneToOne(mappedBy = "ratedFor")
    @JsonIgnore
    private Rating rating;

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private Set<Fish> fishes;

    @ManyToOne
    @JoinColumn(name = "delivering_type_id")
    private DeliveringType deliveringType;
}
