import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthenticated = signal<boolean>(true);

  constructor() {}
}
