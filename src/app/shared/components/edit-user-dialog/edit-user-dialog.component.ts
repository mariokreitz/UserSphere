import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent implements OnInit {
  editUserForm!: FormGroup;
  roles: string[] = ['admin', 'user'];
  isAdmin = false;
  hidePassword = true;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: any; isAdmin: boolean }
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.data.isAdmin;

    this.editUserForm = this.fb.group({
      username: [this.data.user.username, [Validators.required]],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      firstName: [this.data.user.firstName],
      lastName: [this.data.user.lastName],
      password: [''],
      role: [this.isAdmin ? this.data.user.role : null],
      isVerified: [this.isAdmin ? this.data.user.isVerified : null],
    });
  }

  onSubmit(): void {
    if (this.editUserForm.valid) {
      this.loading = true;
      this.dialogRef.close(this.editUserForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
