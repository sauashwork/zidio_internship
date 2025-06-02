package com.project.lms.LibraryManagementSystem.repository;

import com.project.lms.LibraryManagementSystem.model.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
    Login findByUsername(String username);
}
