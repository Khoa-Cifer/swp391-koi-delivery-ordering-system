package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.News;
import com.swp391team3.koi_delivery_ordering_system.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements INewsService {
    private final NewsRepository newsRepository;

    @Override
    public News createNews(News news) {
        return newsRepository.save(news);
    }

    @Override
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    @Override
    public News updateNewsById(Long id, News updatedNews) {
        return newsRepository.updateNewsById(id, updatedNews.getTitle(), updatedNews.getDescription());
    }

    @Override
    public void deleteNewsById(Long id) {
        newsRepository.deleteById(id);
    }
}
