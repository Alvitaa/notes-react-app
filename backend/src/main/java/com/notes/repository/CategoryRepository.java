package com.notes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notes.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByPersonId(Long personId);
}