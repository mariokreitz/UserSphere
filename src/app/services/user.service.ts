import { Injectable, signal } from '@angular/core';
import { User } from '../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser = signal<User | null | undefined>(undefined);
}
