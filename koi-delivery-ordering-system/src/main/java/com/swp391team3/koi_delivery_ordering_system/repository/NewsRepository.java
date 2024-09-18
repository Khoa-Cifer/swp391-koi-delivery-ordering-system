package com.swp391team3.koi_delivery_ordering_system.repository;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.swp391team3.koi_delivery_ordering_system.model.News;

public interface NewsRepository extends JpaRepository<News, Long>, CrudRepository<News, Long> {
    @Query("UPDATE News SET title = :title, description = :description WHERE id = :id")
    News updateNewsById(long id, String title, String description);
}
