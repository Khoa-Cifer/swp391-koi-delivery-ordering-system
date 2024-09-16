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
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    @Column(unique = true, nullable = false)
    private String email;
    private String password;

    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @OneToOne
    @JoinColumn(name = "avatar_id", referencedColumnName = "id")
    private File file;

    @OneToMany(mappedBy = "sender")
    @JsonIgnore
    private Set<Notification> senders;

    @OneToMany(mappedBy = "receiver")
    @JsonIgnore
    private Set<Notification> receivers;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private Set<Order> customers;

    @OneToMany(mappedBy = "driver")
    @JsonIgnore
    private Set<Order> drivers;

    @OneToMany(mappedBy = "createdBy")
    @JsonIgnore
    private Set<Rating> ratingSet;

    public User(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
