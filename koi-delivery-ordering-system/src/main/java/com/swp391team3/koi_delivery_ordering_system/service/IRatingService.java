package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.Rating;

import java.util.List;
import java.util.Optional;

public interface IRatingService {
    Rating createRating(Rating rating);
    List<Rating> getAllRatings();
    Optional<Rating> getRatingById(Long id);
    void deleteRatingById(Long id);
}
