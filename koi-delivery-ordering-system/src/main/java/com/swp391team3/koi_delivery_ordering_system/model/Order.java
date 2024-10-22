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
    private Date finishDate;
    private String destinationAddress;
    private String destinationLongitude;
    private String destinationLatitude;
    private String senderAddress;
    private String senderLongitude;
    private String senderLatitude;
    private double price;
    private int orderStatus;
    private String receiverEmail;

    @ManyToOne
    @JoinColumn(name = "storage_id")
    private Storage storage;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @OneToMany(mappedBy = "order")
    private Set<OrderDelivering> orderDeliveringSet;

    @ManyToOne
    @JoinColumn(name = "sales_accept_id")
    private SalesStaff salesStaffAccept;

    @ManyToOne
    @JoinColumn(name = "sales_confirm_id")
    private SalesStaff salesStaffConfirmation;

    @ManyToOne
    @JoinColumn(name = "sales_cancel_id")
    private SalesStaff salesStaffCancellation;

    @OneToOne(mappedBy = "ratedFor")
    @JsonIgnore
    private Rating rating;

    @OneToMany(mappedBy = "order")
    private Set<Fish> fishes;
}
