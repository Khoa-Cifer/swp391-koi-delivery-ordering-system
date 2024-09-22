package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.News;

import java.util.List;
import java.util.Optional;

public interface INewsService {
    public List<News> getAllNews();
    public Optional<News> getNewsById(Long id);
    public void deleteNewsById(Long id);
}
