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
    private int orderStatus;
    private String description;
    private Date createdDate;
    private Date lastUpdatedDate;
    private Date finishDate;
    private String destinationAddress;
    private String longitude;
    private String latitude;
    private double price;

    @ManyToOne
    @JoinColumn(name = "storage_id")
    private Storage storage;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private DeliveryStaff driver;

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
