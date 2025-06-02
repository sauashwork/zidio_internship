package com.project.lms.LibraryManagementSystem;

import com.project.lms.LibraryManagementSystem.frontend.LoginServlet;
import com.project.lms.LibraryManagementSystem.frontend.ResetPasswordServlet;
import com.project.lms.LibraryManagementSystem.frontend.SignupServlet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletRegistrationBean;
import org.springframework.context.annotation.Bean;
//com.project.lms.LibraryManagementSystem.LibraryManagementSystemApplication -> to set edit configurations
@SpringBootApplication
public class LibraryManagementSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementSystemApplication.class, args);
    }

    @Bean
    public ServletRegistrationBean<LoginServlet> loginServlet() {
        return new ServletRegistrationBean<>(new LoginServlet(), "/loginServlet");
    }

    @Bean
    public ServletRegistrationBean<SignupServlet> signupServlet() {
        return new ServletRegistrationBean<>(new SignupServlet(), "/signupServlet");
    }

    @Bean
    public ServletRegistrationBean<ResetPasswordServlet> resetPasswordServlet() {
        return new ServletRegistrationBean<>(new ResetPasswordServlet(), "/resetPasswordServlet");
    }

}
