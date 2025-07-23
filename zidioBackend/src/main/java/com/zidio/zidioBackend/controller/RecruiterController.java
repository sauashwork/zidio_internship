package com.zidio.zidioBackend.controller;

import com.zidio.zidioBackend.entity.Recruiter;
import com.zidio.zidioBackend.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/recruiters")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true") // adjust if needed
public class RecruiterController {

    @Autowired
    private RecruiterRepository recruiterRepository;

    @GetMapping
    public ResponseEntity<Long> getRecruitersCount() {
        Long count = recruiterRepository.count();
        return ResponseEntity.ok(count);
    }

    // Get recruiter by ID
    @GetMapping("/{id}")
    public Recruiter getRecruiter(@PathVariable Long id) {
        return recruiterRepository.findById(id).orElse(null);
    }

    @GetMapping("/by-user/{userId}")
    public Recruiter getRecruiterByUserId(@PathVariable Long userId) {
        return recruiterRepository.findByUserId(userId).orElse(null);
    }

    @PutMapping("/{id}")
    public Recruiter updateRecruiter(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        Recruiter recruiter = recruiterRepository.findById(id).orElse(null);
        if (recruiter != null) {
            updates.forEach((key, value) -> {
                if (value != null) {
                    switch (key) {
                        case "fullName":
                            recruiter.setFullName((String) value);
                            break;
                        case "email":
                            recruiter.setEmail((String) value);
                            break;
                        case "companyDetails":
                            recruiter.setCompanyDetails((String) value);
                            break;
                        case "address":
                            recruiter.setAddress((String) value);
                            break;
                        case "phoneNumber":
                            recruiter.setPhoneNumber((String) value);
                            break;
                        default:
                            break;
                    }
                }
            });
            return recruiterRepository.save(recruiter);
        }
        return null;
    }
}