package com.zidio.zidioBackend.service;

import com.zidio.zidioBackend.entity.Recruiter;
import com.zidio.zidioBackend.entity.Student;
import com.zidio.zidioBackend.entity.User;
import com.zidio.zidioBackend.repository.RecruiterRepository;
import com.zidio.zidioBackend.repository.StudentRepository;
import com.zidio.zidioBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RecruiterRepository recruiterRepository;

    @Autowired
    private StudentRepository studentRepository;

    public void signup(String fullName, String email, String password, String role) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }
        User user = new User();
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role);
        userRepository.save(user);
    }

   public User login(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        if (user != null && "Recruiter".equalsIgnoreCase(user.getRole())) {
            // Check if recruiter exists
            Optional<Recruiter> recruiterOpt = recruiterRepository.findByUserId(user.getId());
            System.out.println(recruiterOpt);//debug...
            if (recruiterOpt.isEmpty()) {
                Recruiter recruiter = new Recruiter();
                recruiter.setUserId(user.getId());
                recruiter.setId(user.getId());
                recruiter.setFullName(user.getFullName());
                recruiter.setEmail(user.getEmail());
                recruiter.setAddress(""); // or user.getAddress() if available
                recruiter.setCompanyDetails(""); // or user.getCompanyDetails() if available
                recruiter.setPhoneNumber(""); // or user.getPhoneNumber() if available
                recruiterRepository.save(recruiter);
            } else {
                System.out.println("recruiter exists");
            }
        } else if(user != null && "Student".equalsIgnoreCase(user.getRole())){
            Optional<Student> studentOpt=studentRepository.findByUserId(user.getId());
            if (studentOpt.isEmpty()) {
                Student student = new Student();
                student.setUserId(user.getId());
                student.setId(user.getId());
                student.setFullName(user.getFullName());
                student.setEmail(user.getEmail());
                studentRepository.save(student);
            } else {
                System.out.println("student exists");
            }
        }
        return user;
    }

    public String usersCount() {
        return String.valueOf(userRepository.count());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}