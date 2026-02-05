package com.notes.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.dto.PersonRequest;
import com.notes.entity.Person;
import com.notes.service.PersonService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/persons")
public class PersonController {

    @Autowired
    private PersonService service;

    @PostMapping("/create")
    public ResponseEntity<PersonRequest> createPerson(@RequestBody PersonRequest personRequest) {
        Person person = personRequest.toPerson();
        service.createPerson(person);
        return ResponseEntity.ok(PersonRequest.fromPerson(person));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Person loginRequest) {
        try {
            Person person = service.login(loginRequest.getUsername(), loginRequest.getPassword());
            person.setPassword(null);
            return ResponseEntity.ok(person);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonRequest> getPersonById(@PathVariable Long id) {
        return service.getPersonById(id)
                .map(person -> ResponseEntity.ok(PersonRequest.fromPerson(person)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<PersonRequest> getAllPersons() {
        return service.getAllPersons()
                .stream()
                .map(PersonRequest::fromPerson)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonRequest> updatePerson(@PathVariable Long id, @RequestBody PersonRequest personDTO) {
        Person personToUpdate = personDTO.toPerson();
        personToUpdate.setId(id);
        Person updatedPerson = service.updatePerson(personToUpdate);
        return ResponseEntity.ok(PersonRequest.fromPerson(updatedPerson));
    }
}
