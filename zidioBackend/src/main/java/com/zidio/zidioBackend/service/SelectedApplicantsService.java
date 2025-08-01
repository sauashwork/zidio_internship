package com.zidio.zidioBackend.service;

import com.zidio.zidioBackend.repository.SelectedApplicantsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SelectedApplicantsService {

    @Autowired
    private SelectedApplicantsRepository selectedApplicantsRepository;

    @Transactional
    public void deleteSelectedApplicantByStudentId(Long studentId) {
        selectedApplicantsRepository.deleteByStudentId(studentId);
    }
}
