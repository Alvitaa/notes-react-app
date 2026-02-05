package com.notes.dto;

import com.notes.entity.Person;

public class PersonRequest {
    private Long id;
    private String username;
    private String password;

    public PersonRequest() {
    }

    public PersonRequest(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Person toPerson() {
        Person person = new Person();
        person.setId(this.id);
        person.setUsername(this.username);
        person.setPassword(this.password);
        return person;
    }

    public static PersonRequest fromPerson(Person person) {
        return new PersonRequest(person.getId(), person.getUsername());
    }
}