import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { User } from '../../core/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private userStateService: UserStateService
  ) {}

  getUser(): Observable<User | null> {
    return this.userStateService.user$;
  }

  setUser(user: User | null): void {
    this.userStateService.setUser(user);
  }

  get currentUser(): User | null {
    return this.userStateService.currentUser;
  }

  updateUser(userData: User): Observable<any> {
    return this.http
      .put<User>(`${this.apiUrl}/user/profile/update`, userData, {
        withCredentials: true,
      })
      .pipe(
        map((updatedUser: User) => {
          this.userStateService.setUser(updatedUser);
          return updatedUser;
        }),
        catchError((error) => {
          console.error('Update user error:', error);
          return of(null);
        })
      );
  }

  updateProfilePicture(profilePictureURL: string): Observable<User | null> {
    return this.http
      .put<User>(
        `${this.apiUrl}/user/profile/update/picture`,
        { profilePictureURL },
        { withCredentials: true }
      )
      .pipe(
        map((updatedUser: User) => {
          this.userStateService.setUser(updatedUser);
          return updatedUser;
        }),
        catchError((error) => {
          console.error('Update profile picture error:', error);
          return of(null);
        })
      );
  }
}
