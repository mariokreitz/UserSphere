import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticated = false;
  private userRole: string | null = null;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `${this.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((response: any) => {
          this.isAuthenticated = true;
          this.userRole = response.role;
          return response;
        }),
        catchError((error) => {
          this.isAuthenticated = false;
          this.userRole = null;
          this.userSubject.next(null);
          return of(error);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/user/logout`, { withCredentials: true })
      .pipe(
        map(() => {
          this.isAuthenticated = false;
          this.userRole = null;
          this.userSubject.next(null);
        })
      );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      username,
      email,
      password,
    });
  }

  checkSession(): Observable<boolean> {
    return this.http
      .get<{ role: string }>(`${this.apiUrl}/session`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => {
          this.isAuthenticated = true;
          this.userRole = response.role;
          return true;
        }),
        catchError(() => {
          this.isAuthenticated = false;
          this.userRole = null;
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
