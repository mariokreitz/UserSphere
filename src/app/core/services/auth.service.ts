import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { UserStateService } from '../../shared/services/user-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticated = false;
  private userRole: string | null = null;

  constructor(private http: HttpClient, private userState: UserStateService) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<User>(
        `${this.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((user) => {
          console.log('Response from login:', user);

          if (user) {
            this.isAuthenticated = true;
            this.userRole = user.role;
            this.userState.setUser(user);
          } else {
            console.error('User is null or undefined');
          }
        }),
        catchError((error) => {
          this.isAuthenticated = false;
          this.userRole = null;
          this.userState.setUser(null);
          console.error('Login error:', error);
          return of(error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/user/logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.isAuthenticated = false;
          this.userRole = null;
          this.userState.setUser(null);
        }),
        catchError((error) => {
          console.error('Logout error:', error);
          return of(error);
        })
      );
  }

  getCurrentUser(): Observable<User | null> {
    return this.http
      .get<User>(`${this.apiUrl}/user/profile`, { withCredentials: true })
      .pipe(
        tap((user) => {
          this.userState.setUser(user);
        }),
        catchError((error) => {
          if (error.status === 401) {
            console.error('User not authenticated');
            this.userState.setUser(null);
            return of(null);
          }
          console.error('Error fetching current user:', error);
          return of(null);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/register`, { username, email, password })
      .pipe(
        catchError((error) => {
          console.error('Registration error:', error);
          return of(error);
        })
      );
  }

  checkSession(): Observable<boolean> {
    return this.http
      .get<User>(`${this.apiUrl}/session`, { withCredentials: true })
      .pipe(
        tap((user) => {
          this.isAuthenticated = true;
          this.userRole = user.role;
          this.userState.setUser(user);
        }),
        map(() => true),
        catchError(() => {
          this.isAuthenticated = false;
          this.userRole = null;
          this.userState.setUser(null);
          return of(false);
        })
      );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
}
