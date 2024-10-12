package com.swp391team3.koi_delivery_ordering_system.controller;

import com.swp391team3.koi_delivery_ordering_system.model.News;
import com.swp391team3.koi_delivery_ordering_system.requestDto.NewsRequestDTO;
import com.swp391team3.koi_delivery_ordering_system.service.IFileService;
import com.swp391team3.koi_delivery_ordering_system.service.INewsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@RequiredArgsConstructor
public class NewsController {
    private final INewsService newsService;
    private final IFileService fileService;

    @GetMapping("/getAllNews")
    public ResponseEntity<?> getAllNews() {
        List<News> newsList = newsService.getAllNews();
        return ResponseEntity.ok(newsList);
    }

    @GetMapping("/getNewsById/{id}")
    public ResponseEntity<?> getNewsById(@PathVariable Long id) {
        return ResponseEntity.ok(newsService.getNewsById(id));
    }

    @DeleteMapping("/deleteNewsById/{id}")
    public void deleteNewsById(@PathVariable Long id) {
        newsService.deleteNewsById(id);
    }

    @PostMapping(value = "/createNews")
    public ResponseEntity<?> createNews(@RequestParam(name = "title") String title,
                                        @RequestParam(name = "description") String description,
                                        @RequestParam(name = "type") String type,
                                        @RequestParam(name = "salesStaffId") Long salesStaffId,
                                        @RequestParam(name = "image") MultipartFile file)
    {
        News news = newsService.createNews(title, description, type, salesStaffId, file);

        return ResponseEntity.ok(news);
    }
}
