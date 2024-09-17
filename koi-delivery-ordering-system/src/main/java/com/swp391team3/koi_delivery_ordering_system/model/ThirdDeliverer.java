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
@Table(name = "third_deliverer")
public class ThirdDeliverer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String deliveredType;
    private double priceRate;

    @OneToMany(mappedBy = "deliverer")
    @JsonIgnore
    private Set<ThirdDelivererOrder> thirdDelivererOrders;
}
