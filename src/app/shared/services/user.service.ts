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

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user$ = this.userSubject.asObservable();
  }

  fetchUserProfile(): Observable<User | null> {
    return this.http
      .get(`${this.apiUrl}/user/profile`, { withCredentials: true })
      .pipe(
        map((userData: any) => {
          this.userSubject.next(userData);
          return userData;
        }),
        catchError((error) => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  updateProfile(
    firstName: string,
    lastName: string,
    username: string
  ): Observable<User | null> {
    return this.http
      .put(
        `${this.apiUrl}/user/profile`,
        { firstName, lastName, username },
        { withCredentials: true }
      )
      .pipe(
        map((userData: any) => {
          this.userSubject.next(userData);
          return userData;
        }),
        catchError((error) => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  updateProfilePicture(profilePictureURL: string): Observable<User | null> {
    return this.http
      .put(
        `${this.apiUrl}/user/profile/picture`,
        { profilePictureURL },
        { withCredentials: true }
      )
      .pipe(
        map((userData: any) => {
          this.userSubject.next(userData);
          return userData;
        }),
        catchError((error) => {
          this.userSubject.next(null);
          return of(null);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/user/logout`, {}, { withCredentials: true })
      .pipe(
        map(() => {
          this.userSubject.next(null);
          return { success: true };
        }),
        catchError((error) => {
          return of({ success: false, error });
        })
      );
  }
}
