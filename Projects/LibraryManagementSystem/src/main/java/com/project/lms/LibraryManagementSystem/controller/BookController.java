package com.project.lms.LibraryManagementSystem.controller;

import com.project.lms.LibraryManagementSystem.model.*;
import com.project.lms.LibraryManagementSystem.service.AuthorService;
import com.project.lms.LibraryManagementSystem.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;

import com.project.lms.LibraryManagementSystem.service.PublisherService;

@RestController
@RequestMapping("/books")
//@Tag(name = "Book Details")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private AuthorService authorService;

    @Autowired
    private PublisherService publisherService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    Logger log = LoggerFactory.getLogger(BookController.class);

    @PostMapping(value = "/addBooks", produces = "application/json")
    @Operation(summary = "Add book(s) at once", description = "See example request and add object(s) format same as example request.", tags = {"Add Books"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Books are created successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> addBooks(@RequestBody List<Book> books) {
        List<Book> addedBooks = new ArrayList<>();

        for (Book book : books) {
            if (book.getCreatedOn() == null) {
                book.setCreatedOn(LocalDateTime.now());
            }
            book.setUpdatedOn(LocalDateTime.now());

            if (book.getAuthor() != null) {
                Author existingAuthor = this.authorService.findAuthorByIdAndName(book.getAuthor().getPersonId().getId(), book.getAuthor().getPersonId().getName());
                if (existingAuthor == null) {
                    if (book.getAuthor().getCreatedOn() == null) {
                        book.getAuthor().setCreatedOn(LocalDateTime.now());
                    }
                    book.getAuthor().setUpdatedOn(LocalDateTime.now());
                    this.authorService.addAuthor(book.getAuthor());
                }
                else {
                    book.setAuthor(existingAuthor);
                }
            }

            if (book.getPublisher() != null) {
                Publisher existingPublisher = this.publisherService.findPublisherByIdAndName(book.getPublisher().getPersonId().getId(), book.getPublisher().getPersonId().getName());
                if (existingPublisher == null) {
                    if (book.getPublisher().getCreatedOn() == null) {
                        book.getPublisher().setCreatedOn(LocalDateTime.now());
                    }
                    book.getPublisher().setUpdatedOn(LocalDateTime.now());
                    this.publisherService.addPublisher(book.getPublisher());
                }
                else {
                    book.setPublisher(existingPublisher);
                }
            }

            addedBooks.add(this.bookService.addBook(book));

        }

        return new ResponseEntity<>(addedBooks, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getBookById/{id}", produces = "application/json")
    @Operation(summary = "Get book by id", description = "Give book id to get book", tags = {"Get Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<Book> getBookById(@PathVariable("id") Long id) {
        return new ResponseEntity<Book>(this.bookService.getBookById(id), HttpStatus.OK);
    }

    @GetMapping(value = "/getBookByName/{name}", produces = "application/json")
    @Operation(summary = "Get book(s) by name", description = "Give book name to get book(s)", tags = { "Get Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> getBookByName(@PathVariable("name") String name) {
        return new ResponseEntity<List<Book>>(this.bookService.getBookByName(name).orElseThrow(() -> new RuntimeException("Not Found")), HttpStatus.OK);
    }

    @GetMapping(value = "/getBookByPrice/{price}", produces = "application/json")
    @Operation(summary = "Get book(s) by price", description = "Give book price to get book(s)", tags = { "Get Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> getBookByPrice(@PathVariable("price") Long price) {
        return new ResponseEntity<List<Book>>(this.bookService.getBookByPrice(price), HttpStatus.OK);
    }

    @GetMapping(value = "/getBookByAuthor/{author_id}", produces = "application/json")
    @Operation(summary = "Get book(s) by author id", description = "Give author id to get book(s)", tags = { "Get Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> getBookByAuthorId(@PathVariable("author_id") Long author_id) {
        List<Book> allBooks = this.bookService.getAllBooks();
        List<Book> booksByAuthor = allBooks.stream()
                .filter(book -> book.getAuthor().getPersonId().getId().equals(author_id))
                .collect(Collectors.toList());

        if(booksByAuthor.isEmpty()) {
            throw new RuntimeException("No books found for the author with ID: " + author_id);
        }

        return new ResponseEntity<List<Book>>(booksByAuthor, HttpStatus.OK);
    }

    @GetMapping(value = "/getBookByPublisher/{publisher_id}", produces = "application/json")
    @Operation(summary = "Get book(s) by publisher id", description = "Give publisher id to get book(s)", tags = { "Get Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book found"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> getBookByPublisherId(@PathVariable("publisher_id") Long publisher_id) {
        List<Book> allBooks = this.bookService.getAllBooks();
        List<Book> booksByPublisher = allBooks.stream()
                .filter(book -> book.getPublisher().getPersonId().getId().equals(publisher_id))
                .collect(Collectors.toList());

        if(booksByPublisher.isEmpty()) {
            throw new RuntimeException("No books found for the publisher with ID: " + publisher_id);
        }

        return new ResponseEntity<List<Book>>(booksByPublisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getAllBooks", produces = "application/json")
    @Operation(summary = "Get all book(s)", description = "Just hit try option to get all book(s)", tags = { "Get Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Books found"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> getAllBooks() {
        return new ResponseEntity<List<Book>>(this.bookService.getAllBooks(), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteBook/{id}", produces = "application/json")
    @Operation(summary = "Delete book by id", description = "Give book id to delete book", tags = { "Delete Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<Book> deleteBook(@PathVariable("id") Long id) {
        return new ResponseEntity<Book>(this.bookService.deleteBook(id), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteBookByName/{name}", produces = "application/json")
    @Operation(summary = "Delete book(s) by name", description = "Give book name to delete book(s)", tags = { "Delete Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> deleteBookByName(@PathVariable("name") String name) {
        return new ResponseEntity<List<Book>>(this.bookService.deleteBookByName(name), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteBookByPrice/{price}", produces = "application/json")
    @Operation(summary = "Delete book(s) by price", description = "Give book price to delete book(s)", tags = { "Delete Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> deleteBookByPrice(@PathVariable("price") Long price) {
        return new ResponseEntity<List<Book>>(this.bookService.deleteBookByPrice(price), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteBookByAuthor/{author_id}", produces = "application/json")
    @Operation(summary = "Delete book(s) by author id", description = "Give author id to delete book(s)", tags = { "Delete Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> deleteBookByAuthor(@PathVariable("author_id") Long author_id) {
        return new ResponseEntity<List<Book>>(this.bookService.deleteBookByAuthor(author_id), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteBookByPublisher/{publisher_id}", produces = "application/json")
    @Operation(summary = "Delete book(s) by publisher id", description = "Give publisher id to delete book(s)", tags = { "Delete Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> deleteBookByPublisher(@PathVariable("publisher_id") Long publisher_id) {
        return new ResponseEntity<List<Book>>(this.bookService.deleteBookByPublisher(publisher_id), HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAllBooks", produces = "application/json")
    @Operation(summary = "Delete all book(s)", description = "Just hit try option to delete all book(s)", tags = { "Delete Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Books deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<List<Book>> deleteAllBooks() {
        return new ResponseEntity<List<Book>>(this.bookService.deleteAllBooks(), HttpStatus.OK);
    }

    @PutMapping(value = "/updateBook/{id}", produces = "application/json")
    @Operation(summary = "Update book by id", description = "Give book id to update book", tags = { "Update Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<Book> updateBook(@PathVariable("id") Long id, @RequestBody Book book) {
        return new ResponseEntity<Book>(this.bookService.updateBook(id, book), HttpStatus.OK);
    }

    @PatchMapping(value = "/minorUpdateBook/{id}", produces = "application/json")
    @Operation(summary = "Minor update book by id", description = "Give book id to do minor updates on book", tags = { "Update Book"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Book updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content)
    })
    public ResponseEntity<Book> minorUpdateBook(@PathVariable("id") Long id, @RequestBody Book book) {
        return new ResponseEntity<Book>(this.bookService.minorUpdateBook(id, book), HttpStatus.OK);
    }
}
