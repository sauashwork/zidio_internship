package com.project.lms.LibraryManagementSystem.repository;

import com.project.lms.LibraryManagementSystem.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository <Author, Long> {
    @Query("SELECT a FROM Author a WHERE a.personId.id = :id AND a.personId.name = :name")
    Author findAuthorByIdAndName(Long id, String name);

    @Query("SELECT a FROM Author a WHERE a.personId.name = :name")
    Author findAuthorByName(String name);

    Author findAuthorByEmail(String email);

    Author findAuthorByPhone(String phone);

    Author findAuthorByCity(String city);

    Author findAuthorByState(String state);

    Author findAuthorByCountry(String country);

    Author findAuthorByZip(String zip);
}
