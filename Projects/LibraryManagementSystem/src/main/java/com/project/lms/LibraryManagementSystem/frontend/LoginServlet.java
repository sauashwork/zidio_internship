package com.project.lms.LibraryManagementSystem.frontend;

import com.project.lms.LibraryManagementSystem.model.Signup;
import com.project.lms.LibraryManagementSystem.repository.SignupRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.time.LocalDateTime;

import com.project.lms.LibraryManagementSystem.model.Login;
import com.project.lms.LibraryManagementSystem.repository.LoginRepository;
import org.json.JSONObject;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {

    private LoginRepository loginRepository;
    private SignupRepository signupRepository;

    @Override
    public void init() throws ServletException {
        super.init();
        WebApplicationContext context = (WebApplicationContext) getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        loginRepository = context.getBean(LoginRepository.class);
        signupRepository = context.getBean(SignupRepository.class);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html");
        InputStream inputStream = getClass().getResourceAsStream("/static/logIn.html");
        if (inputStream == null) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND, "logIn.html not found");
            return;
        }
        try (OutputStream outputStream = resp.getOutputStream()) {
            byte[] buffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try (BufferedReader reader = req.getReader()) {
            StringBuilder jsonBuilder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonBuilder.append(line);
            }

            JSONObject jsonObject = new JSONObject(jsonBuilder.toString());
            String username = jsonObject.getString("username");
            String password = jsonObject.getString("password");

            // Validate input
            if (username == null || password == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.setContentType("application/json");
                resp.getWriter().write("{\"message\": \"Username and password are required\"}");
                return;
            }

            Signup existingSignup = signupRepository.findByUsername(username);
            if (existingSignup != null) {
                // Assuming password validation logic
                if (password.equals(existingSignup.getPassword())) {
                    Login login = loginRepository.findByUsername(username);
                    if (login == null) {
                        login = new Login(username, password);
                        login.setLoginDate(LocalDateTime.now());
                        loginRepository.save(login);
                    }
                    else {
                        login.setLoginDate(LocalDateTime.now());
                        loginRepository.save(login);
                    }
                    resp.setStatus(HttpServletResponse.SC_OK);
                    resp.setContentType("application/json");
                    resp.getWriter().write("{\"message\": \"Login successful\"}");
                }
                else {
                    resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    resp.setContentType("application/json");
                    resp.getWriter().write("{\"message\": \"Incorrect password\"}");
                }
            }
            else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.setContentType("application/json");
                resp.getWriter().write("{\"message\": \"Username not registered\"}");
            }
        }
        catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"message\": \"An error occurred\"}");
        }
    }

}