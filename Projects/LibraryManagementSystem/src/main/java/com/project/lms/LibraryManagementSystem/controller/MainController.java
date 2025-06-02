package com.project.lms.LibraryManagementSystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping("/lms")
    public String redirectToLogin() {
        return "redirect:/loginServlet"; // Redirects to the login servlet
    }
}
