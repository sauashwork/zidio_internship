package com.zidio.zidioBackend.repository;

import com.zidio.zidioBackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    User findByEmailAndPassword(String email, String password);
}