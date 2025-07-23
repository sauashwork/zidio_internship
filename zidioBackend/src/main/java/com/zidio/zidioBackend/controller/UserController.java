package com.zidio.zidioBackend.controller;

import com.zidio.zidioBackend.entity.User;
import com.zidio.zidioBackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            userService.signup(user.getFullName(), user.getEmail(), user.getPassword(), user.getRole());
            return ResponseEntity.ok("User signed up successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Sign up failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        User user = userService.login(email, password);
        if (user != null) {
            user.setPassword(null); // Hide password
            return ResponseEntity.ok(user); // <-- Return user object as JSON
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @GetMapping
    public ResponseEntity<String> usersCount() {
        return ResponseEntity.ok(userService.usersCount());
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}