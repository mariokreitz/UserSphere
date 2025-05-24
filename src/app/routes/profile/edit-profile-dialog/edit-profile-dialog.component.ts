import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserInterface } from '../../../../models/types/UserInterface';

@Component({
    selector: 'app-edit-profile-dialog',
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
    ],
    templateUrl: './edit-profile-dialog.component.html',
    styleUrl: './edit-profile-dialog.component.scss',
})
export class EditProfileDialogComponent {
    profileForm: FormGroup;
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<EditProfileDialogComponent>);

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: UserInterface,
    ) {
        this.profileForm = this.fb.group({
            username: [
                data.username || '',
                [
                    Validators.required,
                    Validators.minLength(3),
                ],
            ],
            email: [
                data.email || '',
                [
                    Validators.required,
                    Validators.email,
                ],
            ],
        });
    }

    onSubmit(): void {
        if (this.profileForm.valid) {
            this.dialogRef.close({
                ...this.data,
                ...this.profileForm.value,
            });
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }
}
