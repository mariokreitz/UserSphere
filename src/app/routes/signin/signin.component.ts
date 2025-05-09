import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-signin',
  imports: [
    MatFormFieldModule,
    MatIcon,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  protected signInForm: FormGroup;

  constructor(library: FaIconLibrary) {
    library.addIcons(faGithub, faGoogle);
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {}

  signInWithGoogle() {}

  signInWithGithub() {}
}
