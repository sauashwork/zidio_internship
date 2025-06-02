package com.project.lms.LibraryManagementSystem.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="signup")
public class Signup {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String username;
    private String email;
    private String password;
    private LocalDateTime registrationDate;

    public Signup(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.registrationDate = LocalDateTime.now();
    }
}