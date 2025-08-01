package com.zidio.zidioBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "userSays")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSays {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String photo;
    private String message;
    private String rating;
}
