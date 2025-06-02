package com.project.lms.LibraryManagementSystem.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String name;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "author_id")
    @JoinColumn(name = "author_name")
    private Author author;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "publisher_id")
    @JoinColumn(name = "publisher_name")
    private Publisher publisher;
    private Long price;
    @CreationTimestamp
    private LocalDateTime createdOn;
    @UpdateTimestamp
    private LocalDateTime updatedOn;

}
