import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validator } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
