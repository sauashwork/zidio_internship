package com.zidio.zidioBackend.repository;

import com.zidio.zidioBackend.entity.UserSays;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSaysRepository extends JpaRepository<UserSays, Long> {
}
