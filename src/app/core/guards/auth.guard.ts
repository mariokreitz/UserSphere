import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private userService = inject(UserService);
    private router = inject(Router);

    canActivate(): Observable<boolean | UrlTree> {
        return this.userService.isAuthenticated$.pipe(
          map(isAuth => isAuth ? true : this.router.parseUrl('/login')),
        );
    }
}
