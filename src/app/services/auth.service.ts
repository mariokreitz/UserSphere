import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { UserInterface } from '../types/user.interface';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected http = inject(HttpClient);
  protected router = inject(Router);
  protected userService = inject(UserService);

  login(data: { email: string; password: string }) {
    this.http
      .post<UserInterface>(`${environment.apiUrl}/auth/login`, data, {
        withCredentials: true,
      })
      .subscribe({
        next: (user) => {
          this.userService.currentUser.set(user);
          this.router.navigate(['/dashboard']);
        },
      });
  }

  logout() {
    return this.http
      .post(`${environment.apiUrl}/auth/logout`, {
        withCredentials: true,
      })
      .subscribe(() => {
        this.userService.currentUser.set(null);
        this.router.navigate(['/']);
      });
  }
}
