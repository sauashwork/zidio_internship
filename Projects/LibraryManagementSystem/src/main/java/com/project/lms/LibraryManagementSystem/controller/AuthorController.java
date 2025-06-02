package com.project.lms.LibraryManagementSystem.controller;

import com.project.lms.LibraryManagementSystem.model.Author;
import com.project.lms.LibraryManagementSystem.service.AuthorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/author")
//@Tag(name = "Author Details")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    Logger log = LoggerFactory.getLogger(AuthorController.class);

    @PostMapping(value = "/addAuthors", produces = "application/json")
    @Operation(summary = "Add author(s)", description = "See example and add object(s) in body", tags = {"Add Authors"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Author(s) created successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> addAuthors(@RequestBody List<Author> authors) {
        for(Author author : authors) {
            if(author.getCreatedOn() == null) {
                author.setCreatedOn(LocalDateTime.now());
            }
            author.setUpdatedOn(LocalDateTime.now());
            this.authorService.addAuthor(author);
        }
        return new ResponseEntity<>(authors, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAuthorById/{id}", produces = "application/json")
    @Operation(summary = "Get author by id", description = "Give author id to get author", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
        Author author = this.authorService.getAuthorById(id);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @GetMapping(value = "/getAuthorByName/{name}", produces = "application/json")
    @Operation(summary = "Get author(s) by name", description = "Give author name to get author(s)", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> getAuthorByName(@PathVariable String name) {
        List<Author> authors = this.authorService.getAuthorByName(name);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping(value = "/getAuthorByEmail/{email}", produces = "application/json")
    @Operation(summary = "Get author(s) by email", description = "Give author email to get author(s)", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> getAuthorByEmail(@PathVariable String email) {
        List<Author> authors = this.authorService.getAuthorByEmail(email);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping(value = "/getAuthorByCity/{city}", produces = "application/json")
    @Operation(summary = "Get author(s) by city", description = "Give author city to get author(s)", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> getAuthorByCity(@PathVariable String city) {
        List<Author> authors = this.authorService.getAuthorByCity(city);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping(value = "/getAuthorByState/{state}", produces = "application/json")
    @Operation(summary = "Get author(s) by state", description = "Give author state to get author(s)", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> getAuthorByState(@PathVariable String state) {
        List<Author> authors = this.authorService.getAuthorByState(state);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping(value = "/getAuthorByCountry/{country}", produces = "application/json")
    @Operation(summary = "Get author(s) by country", description = "Give author country to get author(s)", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> getAuthorByCountry(@PathVariable String country) {
        List<Author> authors = this.authorService.getAuthorByCountry(country);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping(value = "/getAuthorByZip/{Zip}", produces = "application/json")
    @Operation(summary = "Get author(s) by Zip", description = "Give author Zip to get author(s)", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> getAuthorByZip(@PathVariable String Zip) {
        List<Author> authors = this.authorService.getAuthorByZip(Zip);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @GetMapping(value = "/getAuthorByPhone/{phone}", produces = "application/json")
    @Operation(summary = "Get author(s) by phone", description = "Give author phone to get author(s)", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Author> getAuthorByPhone(@PathVariable String phone) {
        Author author = this.authorService.getAuthorByPhone(phone);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @GetMapping(value = "/getAllAuthors", produces = "application/json")
    @Operation(summary = "Get all authors", description = "Just hit try option to get all authors", tags = {"Get Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Authors found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> getAllAuthors() {
        List<Author> authors = this.authorService.getAllAuthors();
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorById/{id}", produces = "application/json")
    @Operation(summary = "Delete author by id", description = "Give author id to delete author", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Author> deleteAuthorById(@PathVariable Long id) {
        Author Author = this.authorService.deleteAuthorById(id);
        return new ResponseEntity<>(Author, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorByName/{name}", produces = "application/json")
    @Operation(summary = "Delete author(s) by name", description = "Give author name to delete author(s)", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author(s) deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> deleteAuthorByName(@PathVariable String name) {
        List<Author> authors = this.authorService.deleteAuthorByName(name);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorByState/{state}", produces = "application/json")
    @Operation(summary = "Delete author(s) by state", description = "Give author state to delete author(s)", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author(s) deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> deleteAuthorByState(@PathVariable String state) {
        List<Author> authors = this.authorService.deleteAuthorByState(state);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorByCountry/{country}", produces = "application/json")
    @Operation(summary = "Delete author(s) by country", description = "Give author country to delete author(s)", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author(s) deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> deleteAuthorByCountry(@PathVariable String country) {
        List<Author> authors = this.authorService.deleteAuthorByCountry(country);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorByCity/{city}", produces = "application/json")
    @Operation(summary = "Delete author(s) by city", description = "Give author city to delete author(s)", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author(s) deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> deleteAuthorByCity(@PathVariable String city) {
        List<Author> authors = this.authorService.deleteAuthorByCity(city);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorByEmail/{email}", produces = "application/json")
    @Operation(summary = "Delete author(s) by email", description = "Give author email to delete author(s)", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author(s) deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> deleteAuthorByEmail(@PathVariable String email) {
        List<Author> authors = this.authorService.deleteAuthorByEmail(email);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorByZip/{zip}", produces = "application/json")
    @Operation(summary = "Delete author(s) by zip", description = "Give author zip to delete author(s)", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author(s) deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Author>> deleteAuthorByZip(@PathVariable String zip) {
        List<Author> authors = this.authorService.deleteAuthorByZip(zip);
        return new ResponseEntity<>(authors, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAuthorByPhone/{phone}", produces = "application/json")
    @Operation(summary = "Delete author by phone", description = "Give author phone to delete author", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author(s) deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Author> deleteAuthorByPhone(@PathVariable String phone) {
        Author author = this.authorService.deleteAuthorByPhone(phone);
        return new ResponseEntity<>(author, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAllAuthors", produces = "application/json")
    @Operation(summary = "Delete all authors", description = "Just hit try option to     Delete all authors", tags = {"Delete Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All authors deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<String> deleteAllAuthors() {
        this.authorService.deleteAllAuthors();
        return new ResponseEntity<>("All authors deleted successfully", HttpStatus.OK);
    }

    @PutMapping(value = "/updateAuthor/{id}", produces = "application/json")
    @Operation(summary = "Update author", description = "Update major details of author", tags = {"Update Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @RequestBody Author author) {
        Author updatedAuthor = this.authorService.updateAuthor(author);
        return new ResponseEntity<>(updatedAuthor, HttpStatus.OK);
    }

    @PatchMapping(value = "/minorUpdateAuthor/{id}", produces = "application/json")
    @Operation(summary = "Minor update author", description = "Minor update details of author", tags = {"Update Author"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Author updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Author> minorUpdateAuthor(@PathVariable Long id, @RequestBody Author author) {
        Author updatedAuthor = this.authorService.minorUpdateAuthor(author);
        return new ResponseEntity<>(updatedAuthor, HttpStatus.OK);
    }
}
