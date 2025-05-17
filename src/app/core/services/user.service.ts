import { inject, Injectable, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { UserInterface } from '../../../models/types/UserInterface';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    public currentUser = signal<UserInterface | null | undefined>(undefined);

    private auth = inject(Auth);
    
    public user$ = user(this.auth);
}
