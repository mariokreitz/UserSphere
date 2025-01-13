import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuthenticated = false;

  constructor(private http: HttpClient) {}

  checkSession(): Observable<boolean> {
    return this.http.get('/api/session', { withCredentials: true }).pipe(
      map(() => {
        this.isAuthenticated = true;
        return true;
      }),
      catchError(() => {
        this.isAuthenticated = false;
        return [false];
      })
    );
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
