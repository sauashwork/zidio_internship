package com.zidio.zidioBackend.service;

import com.zidio.zidioBackend.entity.Job;
import com.zidio.zidioBackend.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobService {
    private final JobRepository jobRepository;

    @Autowired
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    public boolean deleteJob(Long id) {
        jobRepository.deleteById(id);
        if (jobRepository.existsById(id)) {
            return false;
        }
        return true;
    }

    public Optional<Job> updateJob(Long id, Job jobDetails) {
        Job job = jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found"));
        job.setType(jobDetails.getType());
        job.setCompany(jobDetails.getCompany());
        job.setLocation(jobDetails.getLocation());
        job.setDetails(jobDetails.getDetails());
        job.setLogo(jobDetails.getLogo());
        job.setBookmarked(jobDetails.isBookmarked());
        return Optional.of(jobRepository.save(job));
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public List<Job> getJobsByRecruiterIdRec(Long id) {
        return jobRepository.findByRecruiterIdRec(id);
    }

    public List<Job> getJobsByIds(List<Long> jobIds) {
        return jobRepository.findAllById(jobIds);
    }

//    public String postAllJobs(List<Job> jobs) {
//        jobRepository.saveAll(jobs);
//        return "Jobs saved successfully";
//    }
}
