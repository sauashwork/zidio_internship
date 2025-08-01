package com.zidio.zidioBackend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Value("$frontend_url")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/signup",
                                "/api/auth/login",
                                "/api/jobs",
                                "/api/userSays",
                                "/api/student_applied_jobs/**",
                                "/api/recruiters/**",
                                "/api/recruiters/by-user/**",
                                "/api/jobs/**",
                                "/api/bookmarks/**",
                                "api/bookmarks",
                                "/api/courses/**",
                                "/api/auth/**",
                                "/api/selected_applicants/**",
                                "api/auth/users/**").permitAll()
                        .anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }
}