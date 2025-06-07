import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  message = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSignup() {
    this.auth.signup({ username: this.username, email: this.email, password: this.password }).subscribe({
      next: (res: string) => {
        this.message = res;
        this.error = '';
        setTimeout(() => {
          this.router.navigate(['/login'], { state: { message: res } });
        }, 1500);
      },
      error: err => {
        if (typeof err.error === 'string') {
          this.error = err.error;
        } else if (err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Signup failed. Username or email may already exist.';
        }
        this.message = '';
      }
    });
  }
}
