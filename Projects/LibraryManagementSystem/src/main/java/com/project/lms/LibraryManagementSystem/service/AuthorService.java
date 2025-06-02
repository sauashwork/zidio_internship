package com.project.lms.LibraryManagementSystem.service;

import com.project.lms.LibraryManagementSystem.model.Author;
import com.project.lms.LibraryManagementSystem.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuthorService {

    @Autowired
    private AuthorRepository authorRepository;

    public void addAuthor(Author author) {
        authorRepository.save(author);
    }

    public Author findAuthorByIdAndName(Long id, String name) {
        return authorRepository.findAuthorByIdAndName(id, name);
    }

    public Author getAuthorById(Long id) {
        return this.authorRepository.findAll()
                .stream().filter(author -> author.getPersonId().getId().equals(id)).findFirst().orElse(null);
    }

    public List<Author> getAuthorByName(String name) {
        return this.authorRepository.findAll()
                .stream().filter(author -> author.getPersonId().getName().equals(name)).toList();
    }

    public List<Author> getAllAuthors() {
        return this.authorRepository.findAll();
    }

    public List<Author> getAuthorByEmail(String email) {
        return this.authorRepository.findAll()
                .stream().filter(author -> author.getEmail().equals(email)).toList();
    }

    public Author getAuthorByPhone(String phone) {
        return this.authorRepository.findAuthorByPhone(phone);
    }

    public List<Author> getAuthorByCity(String city) {
        return this.authorRepository.findAll()
                .stream().filter(author -> author.getCity().equals(city)).toList();
    }

    public List<Author> getAuthorByState(String state) {
        return this.authorRepository.findAll()
                .stream().filter(author -> author.getState().equals(state)).toList();
    }

    public List<Author> getAuthorByCountry(String country) {
        return this.authorRepository.findAll()
                .stream().filter(author -> author.getCountry().equals(country)).toList();
    }

    public List<Author> getAuthorByZip(String zip) {
        return this.authorRepository.findAll()
                .stream().filter(author -> author.getZip().equals(zip)).toList();
    }

    public Author deleteAuthorById(Long id) {
        Author author = this.getAuthorById(id);
        this.authorRepository.delete(author);
        return author;
    }

    public List<Author> deleteAuthorByName(String name) {
        List<Author> authors = this.getAuthorByName(name);
        authors.forEach(author -> this.authorRepository.delete(author));
        return authors;
    }

    public List<Author> deleteAuthorByState(String state) {
        List<Author> authors = this.getAuthorByState(state);
        authors.forEach(author -> this.authorRepository.delete(author));
        return authors;
    }

    public List<Author> deleteAuthorByCountry(String country) {
        List<Author> authors = this.getAuthorByCountry(country);
        authors.forEach(author -> this.authorRepository.delete(author));
        return authors;
    }

    public List<Author> deleteAuthorByCity(String city) {
        List<Author> authors = this.getAuthorByCity(city);
        authors.forEach(author -> this.authorRepository.delete(author));
        return authors;
    }

    public List<Author> deleteAuthorByEmail(String email) {
        List<Author> authors = this.getAuthorByEmail(email);
        authors.forEach(author -> this.authorRepository.delete(author));
        return authors;
    }

    public List<Author> deleteAuthorByZip(String zip) {
        List<Author> authors = this.getAuthorByZip(zip);
        authors.forEach(author -> this.authorRepository.delete(author));
        return authors;
    }

    public Author deleteAuthorByPhone(String phone) {
        Author author = this.getAuthorByPhone(phone);
        this.authorRepository.delete(author);
        return author;
    }

    public void deleteAllAuthors() {
        this.authorRepository.deleteAll();
    }

    public Author updateAuthor(Author author) {
        Author oldAuthor = this.getAuthorById(author.getPersonId().getId());
        oldAuthor.setPersonId(author.getPersonId());
        oldAuthor.getPersonId().setId(author.getPersonId().getId());
        oldAuthor.getPersonId().setName(author.getPersonId().getName());
        oldAuthor.setPhone(author.getPhone());
        oldAuthor.setEmail(author.getEmail());
        oldAuthor.setCity(author.getCity());
        oldAuthor.setState(author.getState());
        oldAuthor.setCountry(author.getCountry());
        oldAuthor.setZip(author.getZip());
        oldAuthor.setCreatedOn(author.getCreatedOn());
        oldAuthor.setUpdatedOn(LocalDateTime.now());
        this.authorRepository.save(oldAuthor);
        return oldAuthor;
    }

    public Author minorUpdateAuthor(Author author) {
        Author oldAuthor = this.getAuthorById(author.getPersonId().getId());
        oldAuthor.setPersonId(author.getPersonId());
        oldAuthor.getPersonId().setId(author.getPersonId().getId());
        oldAuthor.getPersonId().setName(author.getPersonId().getName());
        oldAuthor.setPhone(author.getPhone());
        oldAuthor.setEmail(author.getEmail());
        oldAuthor.setCity(author.getCity());
        oldAuthor.setState(author.getState());
        oldAuthor.setCountry(author.getCountry());
        oldAuthor.setZip(author.getZip());
        oldAuthor.setCreatedOn(author.getCreatedOn());
        oldAuthor.setUpdatedOn(LocalDateTime.now());
        this.authorRepository.save(oldAuthor);
        return oldAuthor;
    }
}
