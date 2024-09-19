package com.swp391team3.koi_delivery_ordering_system.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "delivery_staff")
public class DeliveryStaff {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String address;
    private String latitude;
    private String longitude;
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "avatar_id", referencedColumnName = "id")
    private File file;

    @OneToMany(mappedBy = "driver")
    @JsonIgnore
    private Set<Order> drivers;
}
