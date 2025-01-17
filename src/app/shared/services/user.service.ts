import { Injectable } from '@angular/core';
import { Observable, map, catchError, of, BehaviorSubject } from 'rxjs';
import { User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchUserProfile(): Observable<User | null> {
    return this.http
      .get(`${this.apiUrl}/user/profile`, { withCredentials: true })
      .pipe(
        map((userData: any) => {
          this.userSubject.next(userData);
          this.authService.user$ = this.userSubject.asObservable();
          return userData;
        }),
        catchError((error) => {
          this.userSubject.next(null);
          this.authService.user$ = this.userSubject.asObservable();
          return of(null);
        })
      );
  }
}
