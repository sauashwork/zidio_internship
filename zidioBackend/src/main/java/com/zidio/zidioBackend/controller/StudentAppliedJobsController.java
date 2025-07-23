package com.zidio.zidioBackend.controller;


import com.zidio.zidioBackend.entity.StudentAppliedJobs;
import com.zidio.zidioBackend.repository.StudentAppliedJobsRepository;
import com.zidio.zidioBackend.service.StudentAppliedJobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student_applied_jobs")
public class StudentAppliedJobsController {

    @Autowired
    public StudentAppliedJobsRepository studentAppliedJobsRepository;

    @Autowired
    private StudentAppliedJobsService studentAppliedJobsService;

    @GetMapping
    public List<StudentAppliedJobs> getAllStudentAppliedJobs() {
        return studentAppliedJobsRepository.findAll();
    }

    @GetMapping("/{studentId}")
    public List<StudentAppliedJobs> getStudentAppliedJobsByStudentId(@PathVariable Long studentId) {
        return studentAppliedJobsRepository.findByStudentId(studentId);
    }

    @GetMapping("/appliedCount")
    public int getAppliedCount() {
        return studentAppliedJobsRepository.findAll().size();
    }
    @GetMapping("/byJobId/{jobId}")
    public List<StudentAppliedJobs> getStudentAppliedJobsByJobId(@PathVariable Long jobId) {
        return studentAppliedJobsRepository.findByJobId(jobId);
    }
    @PostMapping
    public ResponseEntity<StudentAppliedJobs> applyForJob(@RequestBody StudentAppliedJobs studentAppliedJobs) {
        StudentAppliedJobs existingApplication = studentAppliedJobsRepository.findByStudentIdAndJobId(studentAppliedJobs.getStudentId(), studentAppliedJobs.getJobId());
        if (existingApplication != null) {
            System.out.println("Application already exists for studentId: " + studentAppliedJobs.getStudentId() + " and jobId: " + studentAppliedJobs.getJobId());
            return ResponseEntity.badRequest().body(null);
        }
        System.out.println("studentAppliedJobs details: "+
                "StudentId: "+studentAppliedJobs.getStudentId()+
                " JobId: "+studentAppliedJobs.getJobId()+
                " Name: "+studentAppliedJobs.getName()+
                " Email: "+studentAppliedJobs.getEmail()+
                " Phone: "+studentAppliedJobs.getPhone()+
                " PermanentAddress: "+studentAppliedJobs.getPermanentAddress()+
                " CurrentAddress: "+studentAppliedJobs.getCurrentAddress()+
                " Qualification: "+studentAppliedJobs.getQualification()+
                " Experience: "+studentAppliedJobs.getExperience()+
                " Skills: "+studentAppliedJobs.getSkills()+
                " CoverLetter: "+studentAppliedJobs.getCoverLetter()+
                " Resume: "+studentAppliedJobs.getResume());
        studentAppliedJobsRepository.save(studentAppliedJobs);
        return ResponseEntity.ok(studentAppliedJobs);
    }

    @DeleteMapping
    public void deleteAllStudentAppliedJobs() {
        studentAppliedJobsRepository.deleteAll();
    }

    @DeleteMapping("/{jobId}/{studentId}")
    public ResponseEntity<String> deleteStudentAppliedJobsByJobIdAndStudentId(@PathVariable Long jobId, @PathVariable Long studentId) {
        studentAppliedJobsService.deleteStudentAppliedJobsByJobIdAndStudentId(jobId, studentId);
        return ResponseEntity.ok("StudentAppliedJobs deleted successfully");
    }
}
