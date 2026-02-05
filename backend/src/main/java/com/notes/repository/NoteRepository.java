package com.notes.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.notes.entity.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByPersonIdOrderByUpdatedAtDesc(Long personId);

    List<Note> findByPersonIdAndArchivedTrueOrderByUpdatedAtDesc(Long personId);

    List<Note> findByPersonIdAndArchivedFalseOrderByUpdatedAtDesc(Long personId);

    @Query("SELECT n FROM Note n JOIN n.categories c WHERE c.id = :categoryId")
    List<Note> findByCategoryId(@Param("categoryId") Long categoryId);
}