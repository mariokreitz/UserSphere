import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCsrfToken().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.error('Failed to retrieve CSRF token', err);
      },
    });

    const res = this.authService.checkSession().subscribe({
      next: (loggedIn) => {
        const userRole = this.authService.getUserRole();
        const route = loggedIn && userRole ? `/${userRole}` : '';
        this.router.navigate([route]);
      },
      error: (err) => {
        console.error('Failed to check session', err);
      },
    });
  }
}
