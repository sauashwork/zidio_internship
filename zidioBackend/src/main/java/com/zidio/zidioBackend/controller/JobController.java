package com.zidio.zidioBackend.controller;

import com.zidio.zidioBackend.entity.Job;
import com.zidio.zidioBackend.repository.JobRepository;
import com.zidio.zidioBackend.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private JobRepository jobRepository;

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/jobCount")
    public ResponseEntity<Long> getJobsCount() {
        Long count=jobRepository.findByJobTypeIsJob();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/internshipCount")
    public ResponseEntity<Long> getInternshipCount() {
        Long count=jobRepository.findByJobTypeIsInternship();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return jobService.getJobById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/recruiter/{id}")
    public List<Job> getJobsByRecruiterIdRec(@PathVariable Long id) {
        return jobService.getJobsByRecruiterIdRec(id);
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@RequestBody Job job) {

        System.out.println("Job req: "+"Id: "+job.getId()+" Type: "+job.getType()+" Company: "+job.getCompany()+" Location: "+job.getLocation()+" Details: "+job.getDetails()+" Logo: "+job.getLogo()+" Bookmarked: "+job.isBookmarked()+" JobCategory: "+job.getJobCategory()+" RecruiterId: "+job.getRecruiterIdRec());
//        System.out.println("Type of RecruiterId: "+job.getRecruiterId().getClass());
        Job savedJob = jobRepository.save(job);
        return ResponseEntity.ok(savedJob);
    }

//    @PostMapping
//    public String postAllJobs(@RequestBody List<Job> jobs) {
//        return jobService.postAllJobs(jobs);
//    }

    @PutMapping("/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody Job jobDetails) {
        return jobService.updateJob(id, jobDetails)
                .map(updatedJob -> ResponseEntity.ok(updatedJob))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllJobs() {
        jobRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
}
