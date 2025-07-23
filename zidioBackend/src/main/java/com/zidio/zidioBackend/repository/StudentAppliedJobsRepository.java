package com.zidio.zidioBackend.repository;

import com.zidio.zidioBackend.entity.StudentAppliedJobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentAppliedJobsRepository  extends JpaRepository<StudentAppliedJobs, Long> {
    List<StudentAppliedJobs> findByJobId(Long jobId);

    StudentAppliedJobs findByStudentIdAndJobId(Long studentId, Long jobId);

    List<StudentAppliedJobs> findByStudentId(Long studentId);

    void deleteByJobIdAndStudentId(Long jobId, Long studentId);
}
