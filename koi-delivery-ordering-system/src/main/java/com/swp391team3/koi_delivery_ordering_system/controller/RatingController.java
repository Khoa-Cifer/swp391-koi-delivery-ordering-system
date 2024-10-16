package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.Rating;
import com.swp391team3.koi_delivery_ordering_system.requestDto.CustomerFeedbackRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IRatingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ratings")
@RequiredArgsConstructor
public class RatingController {
    private final IRatingService ratingService;

    @PostMapping("create-new-ratings")
    public ResponseEntity<?> createRating(@RequestBody CustomerFeedbackRequestDTO request) {
        CustomerFeedbackRequestDTO createdRating = ratingService.createRating(request);
        return ResponseEntity.ok(createdRating);
    }

    @GetMapping("get-all-ratings")
    public ResponseEntity<List<Rating>> getAllRatings() {
        List<Rating> ratings = ratingService.getAllRatings();
        return ResponseEntity.ok(ratings);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Rating> getRatingById(@PathVariable Long id) {
//        Optional<Rating> rating = ratingService.getRatingById(id);
//        return rating.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteRatingById(@PathVariable Long id) {
//        ratingService.deleteRatingById(id);
//        return ResponseEntity.noContent().build();
//    }
}
