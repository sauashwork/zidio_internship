document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm'); // Forgot Password Form

    // Login Form Handling
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Clear previous error messages
            document.getElementById('loginUsernameError').textContent = '';
            document.getElementById('loginPasswordError').textContent = '';

            // Regular expression for username validation
            //at least one capital, one small, one number, one special char must
            const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

            // Validate username
            if (!usernameRegex.test(username)) {
                document.getElementById('loginUsernameError').textContent = 'Invalid Username!';
                return;
            }

            // Check password length (should be at least 6 characters)
            if (password.length < 6) {
                document.getElementById('loginPasswordError').textContent = 'Wrong Password!';
                return;
            }

            // Prepare data for submission
            const data = { username: username, password: password };

            // Send a POST request to the login endpoint
            fetch('/loginServlet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert('Welcome to Library Management System');
                    window.location.href = 'http://localhost:8080/swagger-ui/index.html#/'; // Adjust the URL as needed
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Login failed. Please check your credentials.');
                    });
                }
            })
            .catch(error => {
                document.getElementById('loginPasswordError').textContent = error.message;
            });
        });
    }

    // Signup Form Handling
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting

            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Clear previous error messages
            document.getElementById('signupEmailError').textContent = '';
            document.getElementById('signupUsernameError').textContent = '';
            document.getElementById('signupPasswordError').textContent = '';

            // Regular expression for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Regular expression for username validation
            const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

            // Validate email
            if (!emailRegex.test(email)) {
                document.getElementById('signupEmailError').textContent = 'Please enter a valid email address.';
                return;
            }

            // Validate username
            if (!usernameRegex.test(username)) {
                document.getElementById('signupUsernameError').textContent = 'Username must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
                return;
            }

            // Check password length (should be at least 6 characters)
            if (password.length < 6) {
                document.getElementById('signupPasswordError').textContent = 'Password must be at least 6 characters long.';
                return;
            }

            // Prepare data for submission
            const signupData = { email: email, username: username, password: password };

            // Send a POST request to the signup endpoint
            fetch('/signupServlet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Signup successful! Redirecting to login page...');
                    window.location.href = 'http://localhost:8080/lms'; // Adjust the URL as needed
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Signup failed. Please try again.');
                    });
                }
            })
            .catch(error => {
                document.getElementById('signupPasswordError').textContent = error.message;
            });
        });
    }

    // Forgot Password Form Handling
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting

            const email = document.getElementById('email').value;

            // Clear previous error messages
            document.getElementById('emailError').textContent = '';

            // Regular expression for email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validate email
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').textContent = 'Please enter a valid email address.';
                return;
            }

            // Prepare data for submission (if needed for backend API)
            const forgotPasswordData = { email: email };

            // Simulate an API call or perform a real fetch request to reset password
            fetch('/resetPasswordServlet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(forgotPasswordData)
            })
            .then(response => {
                if (response.ok) {
                    alert('Password reset link has been sent to your email!');
                    window.location.href = 'logIn.html'; // Redirect to login page
                } else {
                    return response.json().then(err => {
                        throw new Error(err.message || 'Failed to send password reset email. Please try again.');
                    });
                }
            })
            .catch(error => {
                document.getElementById('emailError').textContent = error.message;
            });
        });
    }
});
