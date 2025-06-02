package com.project.lms.LibraryManagementSystem.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Setter
@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PersonId implements Serializable {

    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;

}
