package com.zidio.zidioBackend.repository;

import com.zidio.zidioBackend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUserId(Long id);
}
