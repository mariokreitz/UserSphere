import { inject, Injectable, signal } from '@angular/core';
import { Auth, user, User as FirebaseUser } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInterface } from '../../../models/types/UserInterface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public currentUser = signal<UserInterface | null>(null);
    public auth = inject(Auth);
    public readonly firebaseUser$ = user(this.auth);
    public readonly isAuthenticated$: Observable<boolean> =
      this.firebaseUser$.pipe(map(fbUser => !!fbUser));

    constructor() {
        this.firebaseUser$.subscribe((fbUser: FirebaseUser | null) => {
            if (fbUser) {
                this.currentUser.set({
                    email: fbUser.email ?? '',
                    username: fbUser.displayName ?? '',
                });
            } else {
                this.currentUser.set(null);
            }
        });
    }

    public currentUserSync(): UserInterface | null {
        return this.currentUser();
    }
}
