package com.project.lms.LibraryManagementSystem.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="login")
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String username;
    private String password;
    private LocalDateTime loginDate;

    public Login(String username, String password) {
        this.username = username;
        this.password = password;
        this.loginDate = LocalDateTime.now();
    }

}