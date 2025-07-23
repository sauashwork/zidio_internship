package com.zidio.zidioBackend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recruiters")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullName;
    private String email;
    private String companyDetails;
    private String address;
    private String phoneNumber;
    private Long userId;
}
