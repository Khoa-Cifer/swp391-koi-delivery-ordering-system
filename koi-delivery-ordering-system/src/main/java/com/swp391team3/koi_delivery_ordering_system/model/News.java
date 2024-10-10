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
@Table(name = "news")
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date createdDate;
    private String title;
    private String description;
    private String type;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private SalesStaff createdBy;

    @OneToOne
    @JoinColumn(name = "news_image_id", referencedColumnName = "id")
    private File file;
}
