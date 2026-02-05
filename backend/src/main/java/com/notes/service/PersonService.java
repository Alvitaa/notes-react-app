package com.notes.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.entity.Person;
import com.notes.repository.PersonRepository;

@Service
public class PersonService {
    @Autowired
    private PersonRepository repository;

    public Person createPerson(Person person) {
        if (repository.findByUsername(person.getUsername()).isPresent()) {
            throw new RuntimeException("This username is already taken.");
        }

        return repository.save(person);
    }

    public Optional<Person> getPersonById(Long id) {
        return repository.findById(id);
    }

    public Optional<Person> getPersonByUsername(String username) {
        return repository.findByUsername(username);
    }

    public Person login(String username, String password) {
        Person person = repository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found."));

        if (!person.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password.");
        }

        return person;
    }

    public List<Person> getAllPersons() {
        return repository.findAll();
    }

    public Person updatePersonPassword(Long personId, String newPassword) {
        Person user = repository.findById(personId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        return repository.save(user);
    }

    public void deletePerson(Long personId) {
        repository.deleteById(personId);
    }

    public Person updatePerson(Person personToUpdate) {
        return repository.save(personToUpdate);
    }
}