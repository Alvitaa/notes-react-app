package com.notes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.entity.Category;
import com.notes.entity.Note;
import com.notes.entity.Person;
import com.notes.repository.CategoryRepository;
import com.notes.repository.NoteRepository;
import com.notes.repository.PersonRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;
    @Autowired
    private PersonRepository personRepository;
    @Autowired
    private NoteRepository noteRepository;

    public Category createCategory(Category category, Long personId) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new RuntimeException("Person not found."));

        category.setPerson(person);
        return repository.save(category);
    }

    public Optional<Category> getCategoryById(Long id) {
        return repository.findById(id);
    }

    public List<Category> getCategoriesByPersonId(Long personId) {
        return repository.findByPersonId(personId);
    }

    public Category updateCategory(Category category, Long personId) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new RuntimeException("Person not found."));

        category.setPerson(person);
        return repository.save(category);
    }

    public void deleteCategory(Long personId, Long categoryId) {
        Category category = repository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found."));

        if(!category.getPerson().getId().equals(personId)){
            throw new RuntimeException("No permission to edit this category.");
        }
        
        List<Note> notesWithCategory = noteRepository.findByCategoryId(category.getId());
        for (Note note : notesWithCategory) {
            note.getCategories().remove(category);
        }

        noteRepository.saveAll(notesWithCategory);
        repository.delete(category);
    }
}
