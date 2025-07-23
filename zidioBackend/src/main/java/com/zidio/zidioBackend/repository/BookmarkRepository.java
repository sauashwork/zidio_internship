package com.zidio.zidioBackend.repository;

import com.zidio.zidioBackend.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    void deleteByJobIdAndStudentId(Long jobId, Long studentId);

    Optional<Bookmark> findByJobIdAndStudentId(Long jobId, Long studentId);


    List<Bookmark> findByStudentId(Long studentId);
}
