package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.News;

import java.util.List;
import java.util.Optional;

public interface INewsService {
    News createNews(News news);
    List<News> getAllNews();
    Optional<News> getNewsById(Long id);
    News updateNewsById(Long id, News news);
    void deleteNewsById(Long id);
}
