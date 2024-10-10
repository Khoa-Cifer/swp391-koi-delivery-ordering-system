package com.swp391team3.koi_delivery_ordering_system.service;

import com.swp391team3.koi_delivery_ordering_system.model.File;
import com.swp391team3.koi_delivery_ordering_system.model.News;
import com.swp391team3.koi_delivery_ordering_system.repository.NewsRepository;
import com.swp391team3.koi_delivery_ordering_system.repository.SalesStaffRepository;
import com.swp391team3.koi_delivery_ordering_system.requestDto.NewsRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NewsServiceImpl implements INewsService {
    private final NewsRepository newsRepository;
    private final SalesStaffRepository salesStaffRepository;
    private final FileServiceImpl fileService;

    @Override
    public List<News> getAllNews() {
        return newsRepository.findAll();
    }

    @Override
    public Optional<News> getNewsById(Long id) {
        return newsRepository.findById(id);
    }

    @Override
    public void deleteNewsById(Long id) {
        newsRepository.deleteById(id);
    }

    @Override
    public News createNews(NewsRequestDTO newsRequestDTO){
        File uploadedFile = null;
        try {
            uploadedFile = fileService.uploadFileToFileSystem(newsRequestDTO.getFile());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        News news = new News();
        news.setCreatedDate(new java.util.Date());
        news.setTitle(newsRequestDTO.getTitle());
        news.setDescription(newsRequestDTO.getDescription());
        news.setType(newsRequestDTO.getType());

        news.setCreatedBy(salesStaffRepository.findById(newsRequestDTO.getSalesStaffId()).get());
        news.setFile(uploadedFile);

        return newsRepository.save(news);
    }
}
