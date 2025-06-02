package com.project.lms.LibraryManagementSystem.repository;

import com.project.lms.LibraryManagementSystem.model.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    @Query("SELECT p FROM Publisher p WHERE p.personId.id = :id AND p.personId.name = :name")
    Publisher findByIdAndName(Long id, String name);

    Publisher findPublisherByPhone(String phone);

}
