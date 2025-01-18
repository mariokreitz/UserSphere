import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-user-dialog',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
})
export class EditUserDialogComponent implements OnInit {
  editUserForm!: FormGroup;
  roles: string[] = ['admin', 'user'];
  isAdmin = false;

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
      this.dialogRef.close(this.editUserForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
