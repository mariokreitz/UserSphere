import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  imports: [],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  private auth = inject(Auth);

  async signin(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }
}
