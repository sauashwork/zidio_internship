package com.zidio.zidioBackend.controller;


import com.zidio.zidioBackend.entity.SelectedApplicants;
import com.zidio.zidioBackend.repository.SelectedApplicantsRepository;
import com.zidio.zidioBackend.service.SelectedApplicantsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/selected_applicants")
public class SelectedApplicantsController {

    @Autowired
    private SelectedApplicantsRepository selectedApplicantsRepository;

    @Autowired
    private SelectedApplicantsService selectedApplicantsService;

    @GetMapping("/{jobId}/{studentId}")
    public ResponseEntity<String> getSelectedApplicantByJobIdStudentId(@PathVariable Long jobId, @PathVariable Long studentId) {
        if(jobId == null || studentId == null) {
            return ResponseEntity.badRequest().body(null);
        }

        return selectedApplicantsRepository.existsByJobIdAndStudentId(jobId, studentId) ? ResponseEntity.ok("Selected") : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<SelectedApplicants> createSelectedApplicant(@RequestBody SelectedApplicants selectedApplicants) {
        boolean exists = selectedApplicantsRepository.existsByJobIdAndStudentId((Long) selectedApplicants.getJobId(), (Long) selectedApplicants.getStudentId());
        if (exists) {
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("SelectedApplicants req: "+"JobId: "+selectedApplicants.getJobId()+" StudentId: "+selectedApplicants.getStudentId());
        selectedApplicants.setJobId((Long) selectedApplicants.getJobId());
        selectedApplicants.setStudentId((Long) selectedApplicants.getStudentId());
        return ResponseEntity.ok(selectedApplicantsRepository.save(selectedApplicants));
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<String> deleteSelectedApplicantByStudentId(@PathVariable Long studentId) {
        selectedApplicantsService.deleteSelectedApplicantByStudentId(studentId);
        return ResponseEntity.ok("Selected Applicants deleted successfully");
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<SelectedApplicants> getSelectedApplicantsByStudentId(@PathVariable Long studentId) {
        SelectedApplicants selectedApplicants = selectedApplicantsRepository.findByStudentId(studentId);
        return selectedApplicants != null ? ResponseEntity.ok(selectedApplicants) : ResponseEntity.notFound().build();
    }

    @GetMapping("/allSelections/{studentId}")
    public ResponseEntity<List<SelectedApplicants>> getAllSelectedApplicantsByStudentId(@PathVariable Long studentId) {
        List<SelectedApplicants> selectedApplicants = selectedApplicantsRepository.findAllSelectedJobsByStudentId(studentId);
        return selectedApplicants != null ? ResponseEntity.ok(selectedApplicants) : ResponseEntity.notFound().build();
    }
}
