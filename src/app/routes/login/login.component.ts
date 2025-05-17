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
import { UserService } from '../../core/services/user.service';

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
    private userService = inject(UserService);
    private router = inject(Router);
    private snackbarService = inject(SnackbarService);

    get email() {
        return this.signupForm.get('email');
    }

    get password() {
        return this.signupForm.get('password');
    }

    constructor() {
        this.signupForm = new FormGroup({
            email: new FormControl<string | null>(null, [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl<string | null>(null, [
                Validators.required,
                Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
                Validators.minLength(8),
            ]),
        });

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

        const { email, password } = this.signupForm.value;

        this.authService.signIn(email!, password!).subscribe({
            next: (res) => {
                this.isLoading.set(false);
                this.snackbarService.success('Erfolgreich angemeldet');
                this.router.navigateByUrl('/');
            },
            error: (err) => {
                this.isLoading.set(false);
                this.setFormError('password', 'invalidPassword', 'Benutzername oder Passwort sind falsch');
            },
        });

    }

    signInWithGoogle(): void {
        console.log('Google Sign-In aufgerufen');
    }

    signInWithGithub(): void {
        console.log('GitHub Sign-In aufgerufen');
    }

    setFormError(formControlName: string, errorType: string, errorMessage: string) {
        const formControl = this.signupForm.get(formControlName);
        if (formControl) {
            formControl.setErrors({ [errorType]: errorMessage });
        }
    }
}
