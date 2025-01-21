import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.checkSession().subscribe({
      next: (loggedIn) => {
        if (loggedIn) {
          this.authService.getCurrentUser().subscribe({
            next: (user) => {
              if (user) {
                const userRole = this.authService.getUserRole();
                const route = userRole ? `/${userRole}` : '';
                this.router.navigate([route]);
              } else {
                this.router.navigate(['/login']);
              }
            },
            error: (err) => {
              console.error('Error loading current user:', err);
              this.router.navigate(['/login']);
            },
          });
        } else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Failed to check session', err);
        this.router.navigate(['/login']);
      },
    });
  }
}
