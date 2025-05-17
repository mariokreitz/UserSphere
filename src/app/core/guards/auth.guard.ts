import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private router = inject(Router);
    private userService = inject(UserService);

    canActivate(): boolean {
        const isAuthenticated = this.checkAuthentication();
        if (!isAuthenticated) {
            this.router.navigate([ '/login' ]);
            return false;
        }
        return true;
    }

    private checkAuthentication(): Observable<boolean> {
        return this.userService.user$.pipe(
          map((user) => {
              return !!user;
          }),
        );
    }
}