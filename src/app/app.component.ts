import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UserService } from './core/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.checkSession().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        const role = this.userService.getUserRole();
        console.log('User is logged in with role:', role);

        if (role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (role === 'user') {
          this.router.navigate(['/user-dashboard']);
        }
      } else {
        console.log('User is not logged in');
        this.router.navigate(['/login']);
      }
    });
  }
}
