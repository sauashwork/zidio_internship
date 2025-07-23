package com.zidio.zidioBackend.repository;

import com.zidio.zidioBackend.entity.SelectedApplicants;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SelectedApplicantsRepository extends JpaRepository<SelectedApplicants, Long> {
    boolean existsByJobIdAndStudentId(Long jobId, Long studentId);

    void deleteByStudentId(Long studentId);

    SelectedApplicants findByStudentId(Long studentId);

    List<SelectedApplicants> findAllSelectedJobsByStudentId(Long studentId);
}
