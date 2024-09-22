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
@Table(name = "manager")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "avatar_id", referencedColumnName = "id")
    private File file;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private Set<Notification> senders;

    @OneToMany(mappedBy = "manager")
    @JsonIgnore
    private Set<Order> orders;
}
