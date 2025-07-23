package com.zidio.zidioBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="student_applied_jobs")
public class StudentAppliedJobs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long jobId;
    private String name;
    private String email;
    private String phone;
    private String permanentAddress;
    private String currentAddress;
    private String qualification;
    private String experience;
    private String skills;
    private String coverLetter;
    private String resume;
}
