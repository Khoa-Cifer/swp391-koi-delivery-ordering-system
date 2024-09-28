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
@Table(name = "fish")
public class Fish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
//    private String description;
    private int status;
    private double price;

    @OneToOne
    @JoinColumn(name = "fish_image_id", referencedColumnName = "id")
    private File file;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @OneToMany(mappedBy = "fish")
    @JsonIgnore
    private Set<License> licenses;

    @ManyToOne
    @JoinColumn(name = "sender_id", nullable = false)
    private Customer sender;
}
