import { computed, inject, Injectable, signal } from '@angular/core';
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
    
    public currentUserSync = computed(() => this.currentUser());
    public isAuthenticated = computed(() => this.currentUser() !== null);

    constructor() {
        this.firebaseUser$.subscribe((fbUser: FirebaseUser | null) => {
            if (fbUser) {
                this.currentUser.set({
                    uid: fbUser.uid,
                    email: fbUser.email ?? '',
                    username: fbUser.displayName ?? '',
                    photoURL: fbUser.photoURL ?? '',
                    emailVerified: fbUser.emailVerified,
                    metadata: fbUser.metadata ?? {},
                });
            } else {
                this.currentUser.set(null);
            }
        });
    }

}
