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
@Table(name = "license")
public class License {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String description;
    private Date dateOfIssue;

    @ManyToOne
    @JoinColumn(name = "file_id", referencedColumnName = "id")
    private File file;

    @ManyToOne
    @JoinColumn(name = "fish_id", nullable = false)
    private Fish fish;

    @ManyToOne
    @JoinColumn(name = "license_type_id", referencedColumnName = "id")
    private LicenseType licenseType;
}
