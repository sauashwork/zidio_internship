package com.zidio.zidioBackend.repository;

import com.zidio.zidioBackend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByRecruiterIdRec(Long id);

    @Query("SELECT count(j) FROM Job j WHERE j.type = 'job'")
    Long findByJobTypeIsJob();

    @Query("SELECT count(j) FROM Job j WHERE j.type = 'internship'")
    Long findByJobTypeIsInternship();
}
