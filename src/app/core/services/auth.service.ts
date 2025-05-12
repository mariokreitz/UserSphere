import {inject, Injectable} from '@angular/core';
import {Auth, createUserWithEmailAndPassword} from '@angular/fire/auth';
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth)

  signIn(email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
  }
}
