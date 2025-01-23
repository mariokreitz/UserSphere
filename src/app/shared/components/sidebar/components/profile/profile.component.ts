import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../../../../core/models/user.model';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule, MatIcon, MatMenuModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log('Error logging out', error);
      },
    });
  }
}
