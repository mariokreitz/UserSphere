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

    this.authService.checkSession().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const role = this.authService.getUserRole();

        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'user') {
          this.router.navigate(['/user']);
        }
      } else {
        this.router.navigate(['']); // '' zur home.component ansonsten einfach '/login' für den login screen
      }
    });
  }
}
