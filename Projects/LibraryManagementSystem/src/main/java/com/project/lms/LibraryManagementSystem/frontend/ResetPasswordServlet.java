package com.project.lms.LibraryManagementSystem.frontend;

import com.project.lms.LibraryManagementSystem.model.Signup;
import com.project.lms.LibraryManagementSystem.repository.SignupRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;

@WebServlet("/resetPasswordServlet")
public class ResetPasswordServlet extends HttpServlet {

    private SignupRepository signupRepository;

    @Override
    public void init() throws ServletException {
        super.init();
        WebApplicationContext context = (WebApplicationContext) getServletContext().getAttribute(WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        signupRepository = context.getBean(SignupRepository.class);
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/html");
        InputStream inputStream = getClass().getResourceAsStream("/static/forgotPassword.html");
        if (inputStream == null) {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND, "resetPassword.html not found");
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
            JSONObject json = new JSONObject(jsonBuilder.toString());

            String email = json.getString("email");
            if (email == null || email.isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.setContentType("application/json");
                resp.getWriter().write("{\"message\": \"Email is required\"}");
                return;
            }

            Signup signup = signupRepository.findByEmail(email);
            if (signup == null) {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.setContentType("application/json");
                resp.getWriter().write("{\"message\": \"User not found with email: " + email + "\"}");
                return;
            }

            // User found, send email
            sendEmail(signup.getEmail(), signup.getUsername(), signup.getPassword());
            resp.setStatus(HttpServletResponse.SC_OK);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"message\": \"Password reset email sent successfully.\"}");
        }
    }

    private void sendEmail(String recipientEmail, String username, String password) {
        // Email properties
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com"); // Gmail SMTP server
        properties.put("mail.smtp.port", "587"); // Gmail SMTP port

        // Create a session with authentication
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication("onlycoding143@gmail.com", "jksfchfobryspgmd"); // Your Gmail and password
            }
        });

        try {
            // Create a MimeMessage
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("sunnydebba45221@gmail.com")); // Your email
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
            message.setSubject("Password Reset Instructions");
            message.setText("Dear " + username + ",\n\n" +
                    "We received a request to reset your password. If you did not request a password reset, please ignore this email.\n\n" +
                    "If you did request a password reset, please use the following credentials to log in to your account:\n\n" +
                    "Username: " + username + "\n" +
                    "Password: " + password + "\n\n" + "Thank you for using our service.");

            // Send the message
            Transport.send(message);
            System.out.println("Email sent successfully to " + recipientEmail);
        } catch (MessagingException e) {
            e.printStackTrace(); // Handle exception appropriately in production code
        }
    }
}
