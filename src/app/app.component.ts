import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService
      .checkSession()
      .pipe(
        switchMap((loggedIn) => {
          if (loggedIn) {
            return this.authService.getCurrentUser();
          } else {
            return [];
          }
        })
      )
      .subscribe({
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
          console.error('Failed to check session', err);
          this.router.navigate(['/login']);
        },
      });
  }
}
