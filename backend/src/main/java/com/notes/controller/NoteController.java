package com.notes.controller;
import java.util.List;

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

import com.notes.dto.NoteRequest;
import com.notes.entity.Note;
import com.notes.service.NoteService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notes")
public class NoteController {
    @Autowired
    private NoteService service;

    @GetMapping("/{personId}")
    public List <Note> getNotesByPerson(@PathVariable Long personId) {
        List<Note> notes = service.getNotesByPerson(personId);
        notes.forEach(note -> note.setPerson(null));
        return notes;
    }

    @GetMapping("/archived/{personId}")
    public List<Note> getArchivedNotesByPerson(@PathVariable Long personId) {
        List<Note> notes = service.getArchivedNotesByPerson(personId);
        notes.forEach(note -> note.setPerson(null));
        return notes;
    }

    @GetMapping("/active/{personId}")
    public List<Note> getActiveNotesByPerson(@PathVariable Long personId) {
        List<Note> notes = service.getActiveNotesByPerson(personId);
        notes.forEach(note -> note.setPerson(null));
        return notes;
    }

    @PostMapping("/create/{personId}")
    public ResponseEntity<Note> createNote(@PathVariable Long personId, @RequestBody NoteRequest noteRequest) {
        Note createdNote = service.createNote(
            noteRequest.toNote(),
            noteRequest.getCategoryIds(),
            personId
        );
        createdNote.setPerson(null);
        return ResponseEntity.ok(createdNote);
    }

    @PutMapping("/{personId}/{noteId}")
    public ResponseEntity<Note> updateNote(@PathVariable Long personId,
                           @PathVariable Long noteId,
                           @RequestBody NoteRequest noteRequest) {
        Note updated = service.updateNote(noteId, noteRequest, personId);
        updated.setPerson(null);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/delete/{personId}/{noteId}")
    public void deleteNote(@PathVariable Long personId, @PathVariable Long noteId) {
        service.deleteNote(noteId, personId);
    }
}