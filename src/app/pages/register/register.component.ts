import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validator } from '@angular/forms';
import { environment } from '../../../environments/environment.development';
import { UserInterface } from '../../types/user.interface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);

  form = this.fb.nonNullable.group({
    username: [''],
    email: [''],
    password: [''],
  });

  onSubmit() {
    this.http
      .post<UserInterface>(
        `${environment.apiUrl}/auth/register`,
        this.form.getRawValue(),
        { withCredentials: true }
      )
      .subscribe((res) => console.log(res));
  }
}
