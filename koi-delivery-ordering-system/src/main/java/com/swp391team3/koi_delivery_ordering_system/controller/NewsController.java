package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.News;
import com.swp391team3.koi_delivery_ordering_system.service.INewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final INewsService newsService;

    @GetMapping
    public ResponseEntity<?> getAllNews() {
        List<News> newsList = newsService.getAllNews();
        return ResponseEntity.ok(newsList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable Long id) {
        return ResponseEntity.ok(newsService.getNewsById(id));
    }

    @DeleteMapping("/{id}")
    public void deleteNewsById(@PathVariable Long id) {
        newsService.deleteNewsById(id);
    }

    @PostMapping("/createNews")
    public ResponseEntity<?> createNews(@RequestBody News news) {
        return ResponseEntity.ok(newsService.createNews(news));
    }
}
