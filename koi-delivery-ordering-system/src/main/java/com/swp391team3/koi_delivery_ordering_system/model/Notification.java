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

    @Column(name = "receiver_id")
    private Long receiver;

}