package com.project.lms.LibraryManagementSystem.repository;

import com.project.lms.LibraryManagementSystem.model.Signup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignupRepository extends JpaRepository<Signup, Long> {
    Signup findByUsername(String username);

    Signup findByEmail(String email);
}
