import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const role = this.authService.getUserRole();

    if (isLoggedIn && role === 'user') {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
