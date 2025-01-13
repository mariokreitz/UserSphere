import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuthenticated = false;
  private userRole: string | null = null;

  constructor(private http: HttpClient) {}

  checkSession(): Observable<boolean> {
    return this.http
      .get<{ role: string }>('/session', { withCredentials: true })
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
