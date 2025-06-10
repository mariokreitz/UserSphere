import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Customer } from '../../../../models/interface/CustomerInterface';

@Component({
    selector: 'app-customer-form-dialog',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
    ],
    templateUrl: './customer-form.component.html',
    styleUrls: [ './customer-form.component.scss' ],
})
export class CustomerFormDialogComponent {
    customerForm: FormGroup;

    constructor(
      public dialogRef: MatDialogRef<CustomerFormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { isNewCustomer: boolean, customer?: Customer },
      private fb: FormBuilder,
    ) {
        this.customerForm = this.fb.group({
            firstName: [
                '',
                Validators.required,
            ],
            lastName: [
                '',
                Validators.required,
            ],
            company: [ '' ],
            email: [
                '',
                [
                    Validators.required,
                    Validators.email,
                ],
            ],
            customerType: [
                'lead',
                Validators.required,
            ],
        });

        if (data.customer) {
            this.customerForm.patchValue(data.customer);
        }
    }

    saveCustomer(): void {
        if (this.customerForm.valid) {
            this.dialogRef.close(this.customerForm.value);
        }
    }
}