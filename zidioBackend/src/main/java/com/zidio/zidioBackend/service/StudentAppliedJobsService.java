package com.zidio.zidioBackend.service;

import com.zidio.zidioBackend.repository.StudentAppliedJobsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentAppliedJobsService {

    @Autowired
    private StudentAppliedJobsRepository studentAppliedJobsRepository;

    @Transactional
    public void deleteStudentAppliedJobsByJobIdAndStudentId(Long jobId, Long studentId) {
        studentAppliedJobsRepository.deleteByJobIdAndStudentId(jobId, studentId);
    }
}
