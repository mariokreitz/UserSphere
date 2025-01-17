import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUser(): Observable<User | null> {
    return this.http
      .get(`${this.apiUrl}/user/profile`, { withCredentials: true })
      .pipe(
        map((userData: any) => {
          return userData;
        }),
        catchError((error) => {
          return of(null);
        })
      );
  }

  updateUser(userData: User): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/user/profile/update`, userData, {
        withCredentials: true,
      })
      .pipe(
        map((userData: any) => {
          return userData;
        }),
        catchError((error) => {
          return of(null);
        })
      );
  }

  updateProfilePicture(profilePictureURL: string): Observable<User | null> {
    return this.http
      .put(
        `${this.apiUrl}/user/profile/update/picture`,
        { profilePictureURL },
        { withCredentials: true }
      )
      .pipe(
        map((userData: any) => {
          return userData;
        }),
        catchError((error) => {
          return of(null);
        })
      );
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/user/logout`, {}, { withCredentials: true })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error) => {
          return of({ success: false, error });
        })
      );
  }
}
