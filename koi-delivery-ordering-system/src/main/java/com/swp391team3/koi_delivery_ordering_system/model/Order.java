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
    private String orderStatus;
    private String description;
    private String type;
    private String deliveredType;
    private Date createdDate;
    private Date lastUpdatedDate;
    private Date finishDate;
    private double price;
    private double externalPrice;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "driver_id", nullable = false)
    private DeliveryStaff driver;

    @OneToMany(mappedBy = "ratedFor")
    @JsonIgnore
    private Set<Rating> ratingSet;

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private Set<Fish> fishes;
}
