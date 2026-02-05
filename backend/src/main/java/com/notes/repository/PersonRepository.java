package com.notes.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notes.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Long> {
    public Optional<Person> findById(long id);

    public Optional<Person> findByUsername(String username);
}