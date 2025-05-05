import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validator } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    const data = this.form.getRawValue();
    this.authService.login(data);
  }
}
