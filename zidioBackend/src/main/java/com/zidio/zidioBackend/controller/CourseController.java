package com.zidio.zidioBackend.controller;

import com.zidio.zidioBackend.entity.Courses;
import com.zidio.zidioBackend.repository.CoursesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CoursesRepository coursesRepository;

    @PostMapping
    public ResponseEntity<String> addAllCourses(@RequestBody List<Courses> courses) {
        coursesRepository.saveAll(courses);
        return ResponseEntity.ok("Courses added successfully");
    }

    @GetMapping
    public List<Courses> getAllCourses() {
        return coursesRepository.findAll();
    }
}
