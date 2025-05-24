import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserInterface } from '../../../models/types/UserInterface';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <h2 mat-dialog-title>Profil bearbeiten</h2>
    <mat-dialog-content>
      <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
        <div class="form-container">
          <mat-form-field appearance="outline">
            <mat-label>Benutzername</mat-label>
            <input matInput formControlName="username" placeholder="Ihr Name">
            <mat-icon matSuffix>person</mat-icon>
            <mat-hint>Wie möchten Sie genannt werden?</mat-hint>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>E-Mail</mat-label>
            <input matInput formControlName="email" type="email" placeholder="Ihre E-Mail-Adresse">
            <mat-icon matSuffix>email</mat-icon>
          </mat-form-field>

          <div class="form-actions">
            <button mat-button type="button" (click)="onCancel()">Abbrechen</button>
            <button 
              mat-raised-button 
              color="primary" 
              type="submit"
              [disabled]="!profileForm.valid || !profileForm.dirty"
            >
              Speichern
            </button>
          </div>
        </div>
      </form>
    </mat-dialog-content>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 1rem 0;
      min-width: 400px;
    }
    
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 1rem;
    }
    
    mat-dialog-content {
      padding: 0 24px 24px;
    }
    
    h2 {
      margin: 0;
      padding: 16px 24px;
      font-size: 1.5rem;
      font-weight: 500;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    }
  `]
})
export class EditProfileDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditProfileDialogComponent>);
  
  profileForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserInterface
  ) {
    this.profileForm = this.fb.group({
      username: [data.username || '', [Validators.required, Validators.minLength(3)]],
      email: [data.email || '', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.dialogRef.close({
        ...this.data,
        ...this.profileForm.value
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
