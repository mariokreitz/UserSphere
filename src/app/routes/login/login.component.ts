import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RegisterForm} from '../../../models/types/registerForm';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class LoginComponent {
  protected isPasswordVisible = signal(false);
  protected isLoading = signal(false);
  protected signupForm: FormGroup<RegisterForm>;

  private auth = inject(AuthService);

  constructor() {
    this.signupForm = new FormGroup({
      email: new FormControl<string | null>(null, [Validators.required, Validators.email]),
      password: new FormControl<string | null>(null, [Validators.required, Validators.minLength(6)]),
    });

  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  togglePasswordVisibility() {
    this.isPasswordVisible.update(value => !value);
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const {email, password} = this.signupForm.value;

    this.auth.signIn(email!, password!).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.signupForm.reset();
      }
    })


  }

  signInWithGoogle(): void {
    console.log('Google Sign-In aufgerufen');
  }

  signInWithGithub(): void {
    console.log('GitHub Sign-In aufgerufen');
  }
}
