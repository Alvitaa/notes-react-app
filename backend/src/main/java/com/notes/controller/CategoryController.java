package com.notes.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.dto.CategoryRequest;
import com.notes.entity.Category;
import com.notes.service.CategoryService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryService service;

    @PostMapping("/person/{personId}")
    public ResponseEntity<CategoryRequest> createCategory(@PathVariable Long personId, @RequestBody CategoryRequest categoryDTO) {
        Category category = categoryDTO.toCategory();
        Category created = service.createCategory(category, personId);
        return ResponseEntity.ok(CategoryRequest.fromCategory(created));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryRequest> getCategoryById(@PathVariable Long id) {
        return service.getCategoryById(id)
                .map(category -> ResponseEntity.ok(CategoryRequest.fromCategory(category)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/person/{personId}")
    public List<CategoryRequest> getCategoriesByPerson(@PathVariable Long personId) {
        return service.getCategoriesByPersonId(personId)
                .stream()
                .map(CategoryRequest::fromCategory)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}/person/{personId}")
    public ResponseEntity<CategoryRequest> updateCategory(@PathVariable Long id, @PathVariable Long personId, @RequestBody CategoryRequest categoryDTO) {
        Category categoryToUpdate = categoryDTO.toCategory();
        categoryToUpdate.setId(id);
        Category updated = service.updateCategory(categoryToUpdate, personId);
        return ResponseEntity.ok(CategoryRequest.fromCategory(updated));
    }

    @DeleteMapping("/{personId}/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long personId,@PathVariable Long categoryId) {
        service.deleteCategory(personId, categoryId);
        return ResponseEntity.noContent().build();
    }
}