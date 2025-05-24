package com.zidio.zidioBackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "zjpUsers")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String role;
}