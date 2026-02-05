package com.notes.dto;

import com.notes.entity.Category;

public class CategoryRequest {

    private Long id;
    private String name;
    private Long personId;

    public CategoryRequest() {
    }

    public CategoryRequest(Long id, String name, Long personId) {
        this.id = id;
        this.name = name;
        this.personId = personId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public Category toCategory() {
        Category category = new Category();
        category.setId(this.id);
        category.setName(this.name);
        return category;
    }

    public static CategoryRequest fromCategory(Category category) {
        Long personId = category.getPerson() != null ? category.getPerson().getId() : null;
        return new CategoryRequest(category.getId(), category.getName(), personId);
    }
}