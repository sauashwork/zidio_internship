package com.project.lms.LibraryManagementSystem.service;

import com.project.lms.LibraryManagementSystem.model.Book;
import com.project.lms.LibraryManagementSystem.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book addBook(Book book) {
        return this.bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return this.bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return this.bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    public Optional<List<Book>> getBookByName(String name) {
        return Optional.ofNullable(this.bookRepository.findByName(name));
    }

    public List<Book> getBookByPrice(Long price) {
        return this.bookRepository.findByPrice(price);
    }

    public Book deleteBook(Long id) {
        Book book = this.getBookById(id);
        this.bookRepository.delete(book);
        return book;
    }

    public List<Book> deleteBookByName(String name) {
        List<Book> books = this.bookRepository.findAllByName(name);
        this.bookRepository.deleteAll(books);
        return books;
    }

    public List<Book> deleteBookByPrice(Long price) {
        List<Book> books = this.bookRepository.findByPrice(price);
        this.bookRepository.deleteAll(books);
        return books;
    }

    public List<Book> deleteBookByAuthor(Long authorId) {
        List<Book> books = this.bookRepository.findAll().stream().filter(book -> book.getAuthor().getPersonId().getId().equals(authorId)).toList();
        this.bookRepository.deleteAll(books);
        return books;
    }

    public List<Book> deleteBookByPublisher(Long publisherId) {
        List<Book> books = this.bookRepository.findAll().stream().filter(book -> book.getPublisher().getPersonId().getId().equals(publisherId)).toList();
        this.bookRepository.deleteAll(books);
        return books;
    }

    public List<Book> deleteAllBooks() {
        List<Book> books = this.bookRepository.findAll();
        this.bookRepository.deleteAll(books);
        return books;
    }

    public Book updateBook(Long id, Book book) {
        Book existingBook = this.bookRepository.getBookById(id);
        existingBook.setName(book.getName());
        existingBook.setPrice(book.getPrice());
        if (book.getAuthor() != null) {
            existingBook.setAuthor(book.getAuthor());
        }
        if (book.getPublisher() != null) {
            existingBook.setPublisher(book.getPublisher());
        }
        if (book.getCreatedOn() != null) {
            existingBook.setCreatedOn(book.getCreatedOn());
        }
        existingBook.setUpdatedOn(LocalDateTime.now());
        return this.bookRepository.save(existingBook);
    }

    public Book minorUpdateBook(Long id, Book book) {
        Book existingBook = this.bookRepository.getBookById(id);
        existingBook.setName(book.getName());
        existingBook.setPrice(book.getPrice());
        if (book.getAuthor() != null) {
            existingBook.setAuthor(book.getAuthor());
        }
        if (book.getPublisher() != null) {
            existingBook.setPublisher(book.getPublisher());
        }
        if (book.getCreatedOn() != null) {
            existingBook.setCreatedOn(book.getCreatedOn());
        }
        existingBook.setUpdatedOn(LocalDateTime.now());
        return this.bookRepository.save(existingBook);
    }
}
