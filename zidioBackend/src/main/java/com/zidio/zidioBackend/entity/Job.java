package com.zidio.zidioBackend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "allJobs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Job {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String company;
    private String location;

    @ElementCollection
    private List<String> details;
    private String logo;
    private String bookmarked;

    private String jobCategory;
    private Long recruiterIdRec;
    public String isBookmarked() {
        return bookmarked;
    }
}
