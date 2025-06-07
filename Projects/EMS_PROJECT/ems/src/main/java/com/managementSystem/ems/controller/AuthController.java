package com.managementSystem.ems.controller;

import com.managementSystem.ems.entity.User;
import com.managementSystem.ems.security.JwtUtil;
import com.managementSystem.ems.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="http://localhost:4200")
// @CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<String> register(@RequestBody User user) {
        System.out.println("Signup attempt: username=" + user.getUsername() + ", email=" + user.getEmail());
        if (userService.findByUsername(user.getUsername()).isPresent()) {
            System.out.println("Username exists: " + user.getUsername());
            return ResponseEntity.badRequest().body("Username already exists");
        }
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            System.out.println("Email exists: " + user.getEmail());
            return ResponseEntity.badRequest().body("Email already exists");
        }
        try {
            userService.registerUser(user);
            System.out.println("User registered: " + user.getUsername());
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Signup failed. Username or email may already exist.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return userService.findByUsername(loginRequest.getUsername())
                .filter(user -> userService.checkPassword(loginRequest.getPassword(), user.getPassword()))
                .map(user -> ResponseEntity.ok(new JwtResponse(jwtUtil.generateToken(user.getUsername()))))
                .orElseGet(() -> ResponseEntity.status(401).body(
                        (JwtResponse) java.util.Collections.singletonMap("message", "Invalid credentials")
                ));
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    public static class JwtResponse {
        private final String token;
    }
}