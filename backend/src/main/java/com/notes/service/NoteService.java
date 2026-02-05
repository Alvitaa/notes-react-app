package com.notes.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.dto.NoteRequest;
import com.notes.entity.Category;
import com.notes.entity.Note;
import com.notes.entity.Person;
import com.notes.repository.CategoryRepository;
import com.notes.repository.NoteRepository;

@Service
public class NoteService {
    @Autowired
    private NoteRepository repository;
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Note> getNotesByPerson(Long personId) {
        return repository.findByPersonIdOrderByUpdatedAtDesc(personId);
    }

    public List<Note> getActiveNotesByPerson(Long personId) {
        return repository.findByPersonIdAndArchivedFalseOrderByUpdatedAtDesc(personId);
    }

    public List<Note> getArchivedNotesByPerson(Long personId) {
        return repository.findByPersonIdAndArchivedTrueOrderByUpdatedAtDesc(personId);
    }

    public Note createNote(Note note, Set<Long> categoryIds, Long personId) {
    Person person = new Person();
    person.setId(personId);
    note.setPerson(person);

    Set<Category> categories = new HashSet<>();
    if (categoryIds != null && !categoryIds.isEmpty()) {
        categories = categoryRepository.findAllById(categoryIds)
            .stream()
            .filter(cat -> cat.getPerson().getId().equals(personId))
            .collect(Collectors.toSet());
    }
    note.setCategories(categories);
    return repository.save(note);
    }

    public Note updateNote(Long id, NoteRequest note, Long personId) {
    String title = note.getTitle();
    String content = note.getContent();
    Boolean isArchived = note.isArchived();
    Set<Long> categoryIds = note.getCategoryIds();

    Note existingNote = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Note not found."));

    if (!existingNote.getPerson().getId().equals(personId)) {
        throw new RuntimeException("No permission to edit this note.");
    }

    if(title != null && !title.isBlank()) {
        existingNote.setTitle(note.getTitle());
    }
    if(content != null && !content.isBlank()) {
        existingNote.setContent(note.getContent());
    }
    if(isArchived != null){
        existingNote.setArchived(note.isArchived());
    }

    Set<Category> categories = new HashSet<>();
    if (categoryIds != null && !categoryIds.isEmpty()) {
        categories = categoryRepository.findAllById(categoryIds)
            .stream()
            .filter(cat -> cat.getPerson().getId().equals(personId))
            .collect(Collectors.toSet());
    }
    existingNote.setCategories(categories);

    return repository.save(existingNote);
    }

    public void deleteNote(Long noteId, Long personId) {
        Note note = repository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found."));

        if (!note.getPerson().getId().equals(personId)) {
            throw new RuntimeException("No permission to edit this note.");
        }

        repository.delete(note);
    }
}