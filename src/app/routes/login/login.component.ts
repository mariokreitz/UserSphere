import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { RegisterForm } from '../../../models/types/registerForm';
import { AuthService } from '../../core/services/auth.service';
import { SnackbarService } from '../../core/services/snackbar.service';

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
        MatProgressSpinnerModule,
    ],
})
export class LoginComponent {
    protected isPasswordVisible = signal(false);
    protected isLoading = signal(false);
    protected signupForm: FormGroup<RegisterForm>;

    private authService = inject(AuthService);
    private router = inject(Router);
    private snackbarService = inject(SnackbarService);

    constructor() {
        this.signupForm = new FormGroup({
            email: new FormControl<string | null>(
              { value: null, disabled: false },
              [
                  Validators.required,
                  Validators.email,
              ],
            ),
            password: new FormControl<string | null>(
              { value: null, disabled: false },
              [
                  Validators.required,
                  Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                  Validators.minLength(8),
              ],
            ),
        });
    }

    public togglePasswordVisibility() {
        this.isPasswordVisible.update(value => !value);
    }

    public onSubmit(): void {
        if (this.signupForm.invalid) {
            this.signupForm.markAllAsTouched();
            return;
        }

        this.isLoading.set(true);

        const { email, password } = this.signupForm.value;

        this.authService.signIn(email!, password!).subscribe({
            next: (res) => {
                this.isLoading.set(false);
                this.router.navigateByUrl('/dashboard');
            },
            error: (err) => {
                this.isLoading.set(false);
                this.setFormError('password', 'invalidPassword', 'Benutzername oder Passwort sind falsch');
            },
        });

    }

    public signInWithGoogle(): void {
        this.isLoading.set(true);
        this.authService.signInWithGoogle().subscribe({
            next: () => {
                this.isLoading.set(false);
                this.router.navigateByUrl('/dashboard');
            },
            error: (err) => {
                this.isLoading.set(false);
                this.snackbarService.error('Fehler beim Anmelden mit Google');
                this.router.navigateByUrl('/login');
            },
        });
    }

    public signInWithGithub(): void {
        this.isLoading.set(true);
        this.authService.signInWithGithub().subscribe({
            next: () => {
                this.isLoading.set(false);
                this.router.navigateByUrl('/dashboard');
            },
            error: (err) => {
                this.isLoading.set(false);
                this.snackbarService.error('Fehler beim Anmelden mit GitHub');
                this.router.navigateByUrl('/login');

            },
        });
    }

    private setFormError(formControlName: string, errorType: string, errorMessage: string) {
        const formControl = this.signupForm.get(formControlName);
        if (formControl) {
            formControl.setErrors({ [errorType]: errorMessage });
        }
    }
}