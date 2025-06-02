package com.project.lms.LibraryManagementSystem.controller;

import com.project.lms.LibraryManagementSystem.model.Publisher;
import com.project.lms.LibraryManagementSystem.service.PublisherService;
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
@RequestMapping("/publisher")
//@Tag(name = "Publisher Details")
public class PublisherController {

    @Autowired
    private PublisherService publisherService;

    Logger log = LoggerFactory.getLogger(PublisherController.class);

    @PostMapping(value = "/addPublishers", produces = "application/json")
    @Operation(summary = "Add publisher(s)", description = "See example and add object(s) in body", tags = {"Add Publishers"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Publisher(s) created successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> addPublisher(@RequestBody List<Publisher> publishers) {
        for(Publisher publisher : publishers) {
            if(publisher.getCreatedOn() == null) {
                publisher.setCreatedOn(LocalDateTime.now());
            }
            publisher.setUpdatedOn(LocalDateTime.now());
            this.publisherService.addPublisher(publisher);
        }
        return new ResponseEntity<>(publishers, HttpStatus.CREATED);
    }

    @GetMapping(value = "/getAllPublisherById/{id}", produces = "application/json")
    @Operation(summary = "Get Publisher by id", description = "Give publisher id to get publisher", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Publisher> getPublisherById(@PathVariable Long id) {
        Publisher publisher = this.publisherService.getPublisherById(id);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getPublisherByName/{name}", produces = "application/json")
    @Operation(summary = "Get Publisher(s) by name", description = "Give publisher name to get publisher(s)", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> getPublisherByName(@PathVariable String name) {
        List<Publisher> publisher = this.publisherService.getPublisherByName(name);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getPublisherByEmail/{email}", produces = "application/json")
    @Operation(summary = "Get Publisher(s) by email", description = "Give publisher email to get publisher(s)", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> getPublisherByEmail(@PathVariable String email) {
        List<Publisher> publisher = this.publisherService.getPublisherByEmail(email);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getPublisherByCity/{city}", produces = "application/json")
    @Operation(summary = "Get Publisher(s) by city", description = "Give publisher city to get publisher(s)", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> getPublisherByCity(@PathVariable String city) {
        List<Publisher> publisher = this.publisherService.getPublisherByCity(city);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getPublisherByState/{state}", produces = "application/json")
    @Operation(summary = "Get Publisher(s) by state", description = "Give publisher state to get publisher(s)", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> getPublisherByState(@PathVariable String state) {
        List<Publisher> publisher = this.publisherService.getPublisherByState(state);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getPublisherByCountry/{country}", produces = "application/json")
    @Operation(summary = "Get Publisher(s) by country", description = "Give publisher country to get publisher(s)", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> getPublisherByCountry(@PathVariable String country) {
        List<Publisher> publisher = this.publisherService.getPublisherByCountry(country);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getPublisherByZip/{zip}", produces = "application/json")
    @Operation(summary = "Get Publisher(s) by zip", description = "Give publisher zip to get publisher(s)", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> getPublisherByZip(@PathVariable String zip) {
        List<Publisher> publisher = this.publisherService.getPublisherByZip(zip);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getPublisherByPhone/{phone}", produces = "application/json")
    @Operation(summary = "Get Publisher(s) by phone", description = "Give publisher phone to get publisher(s)", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Publisher> getPublisherByPhone(@PathVariable String phone) {
        Publisher publisher = this.publisherService.getPublisherByPhone(phone);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @GetMapping(value = "/getAllPublishers", produces = "application/json")
    @Operation(summary = "Get all publishers", description = "Just hit try option to get all publishers", tags = {"Get Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher found successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> getAllPublishers() {
        List<Publisher> publisher = this.publisherService.getAllPublishers();
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherById/{id}", produces = "application/json")
    @Operation(summary = "Delete publisher by id", description = "Give publisher id to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Publisher> deletePublisherById(@PathVariable Long id) {
        Publisher Publisher = this.publisherService.deletePublisherById(id);
        return new ResponseEntity<>(Publisher, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherByName/{name}", produces = "application/json")
    @Operation(summary = "Delete publisher by name", description = "Give publisher name to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> deletePublisherByName(@PathVariable String name) {
        List<Publisher> Publishers = this.publisherService.deletePublisherByName(name);
        return new ResponseEntity<>(Publishers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherByState/{state}", produces = "application/json")
    @Operation(summary = "Delete publisher by state", description = "Give publisher state to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> deletePublisherByState(@PathVariable String state) {
        List<Publisher> Publishers = this.publisherService.deletePublisherByState(state);
        return new ResponseEntity<>(Publishers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherByCountry/{country}", produces = "application/json")
    @Operation(summary = "Delete publisher by country", description = "Give publisher country to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> deletePublisherByCountry(@PathVariable String country) {
        List<Publisher> Publishers = this.publisherService.deletePublisherByCountry(country);
        return new ResponseEntity<>(Publishers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherByCity/{city}", produces = "application/json")
    @Operation(summary = "Delete publisher by city", description = "Give publisher city to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> deletePublisherByCity(@PathVariable String city) {
        List<Publisher> Publishers = this.publisherService.deletePublisherByCity(city);
        return new ResponseEntity<>(Publishers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherByEmail/{email}", produces = "application/json")
    @Operation(summary = "Delete publisher by email", description = "Give publisher email to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> deletePublisherByEmail(@PathVariable String email) {
        List<Publisher> Publishers = this.publisherService.deletePublisherByEmail(email);
        return new ResponseEntity<>(Publishers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherByZip/{zip}", produces = "application/json")
    @Operation(summary = "Delete publisher by zip", description = "Give publisher zip to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<List<Publisher>> deletePublisherByZip(@PathVariable String zip) {
        List<Publisher> Publishers = this.publisherService.deletePublisherByZip(zip);
        return new ResponseEntity<>(Publishers, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deletePublisherByPhone/{phone}", produces = "application/json")
    @Operation(summary = "Delete publisher by phone", description = "Give publisher phone to delete publisher", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Publisher> deletePublisherByPhone(@PathVariable String phone) {
        Publisher publisher = this.publisherService.deletePublisherByPhone(phone);
        return new ResponseEntity<>(publisher, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAllPublishers", produces = "application/json")
    @Operation(summary = "Delete all publishers", description = "Just hit try option to delete all publishers", tags = {"Delete Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All Publishers deleted successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<String> deleteAllPublishers() {
        this.publisherService.deleteAllPublishers();
        return new ResponseEntity<>("All Publishers deleted successfully", HttpStatus.OK);
    }

    @PutMapping(value = "/updatePublisher/{id}", produces = "application/json")
    @Operation(summary = "Update publisher", description = "Update major details of publisher", tags = {"Update Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Publisher> updatePublisher(@PathVariable Long id, @RequestBody Publisher publisher) {
        Publisher updatedPublisher = this.publisherService.updatePublisher(publisher);
        return new ResponseEntity<>(updatedPublisher, HttpStatus.OK);
    }

    @PatchMapping(value = "/minorUpdatePublisher/{id}", produces = "application/json")
    @Operation(summary = "Minor update publisher", description = "Minor update details of publisher", tags = {"Update Publisher"})
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Publisher updated successfully"),
            @ApiResponse(responseCode = "400", description = "Bad Request", content = @Content),
            @ApiResponse(responseCode = "500", description = "Internal Server Error", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not Found", content = @Content)
    })
    public ResponseEntity<Publisher> minorUpdatePublisher(@PathVariable Long id, @RequestBody Publisher publisher) {
        Publisher updatedPublisher = this.publisherService.minorUpdatePublisher(publisher);
        return new ResponseEntity<>(updatedPublisher, HttpStatus.OK);
    }
}
