package com.zidio.zidioBackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "selected_applicants")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SelectedApplicants {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long jobId;
    private Long studentId;
}
