import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.reload(); // or use router to navigate to login
  }

  preventIfNotLoggedIn(event: Event) {
    if (!this.isLoggedIn()) {
      event.preventDefault();
      event.stopPropagation();
      alert('You must log in first to access this feature.');
    }
  }
}
