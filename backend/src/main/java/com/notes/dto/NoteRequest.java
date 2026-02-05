package com.notes.dto;

import java.util.Set;

import com.notes.entity.Note;

public class NoteRequest {

    private Long id;
    private String title;
    private String content;
    private Boolean archived;
    private Set<Long> categoryIds;

    public NoteRequest() {
    }

    public NoteRequest(Long id, String title, String content, Boolean archived, Set<Long> categoryIds) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.archived = archived;
        this.categoryIds = categoryIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean isArchived() {
        return archived;
    }

    public void setArchived(Boolean archived) {
        this.archived = archived;
    }

    public Set<Long> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(Set<Long> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public Note toNote() {
        Note note = new Note();
        note.setTitle(this.title);
        note.setContent(this.content);
        note.setArchived(this.archived != null ? this.archived : false);
        return note;
    }
}