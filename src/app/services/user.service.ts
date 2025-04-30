import { Injectable, signal } from '@angular/core';
import { UserInterface } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<UserInterface | null | undefined>(undefined);
}
