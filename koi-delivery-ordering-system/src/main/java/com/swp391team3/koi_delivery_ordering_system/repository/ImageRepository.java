package com.swp391team3.koi_delivery_ordering_system.repository;

import com.swp391team3.koi_delivery_ordering_system.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByName(String fileName);

    @Query("SELECT i.name FROM Image i")
    List<String> getDuplicateImageName();

    @Query("SELECT COUNT(*) FROM Image i")
    int getTotalImages();
}
