import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../../models/interface/CustomerInterface';
import { normalizeCustomerDates } from '../../../../utils/misc';
import { CustomerService } from '../../services/customer.service';

@Component({
    selector: 'app-detail-view',
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: './detail-view.component.html',
    styleUrl: './detail-view.component.scss',
})
export class DetailViewComponent implements OnInit {
    customer = signal<Customer | null>(null);
    loading = signal<boolean>(true);
    error = signal<string | null>(null);
    private route = inject(ActivatedRoute);
    private customerService = inject(CustomerService);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.customerService.getById(id).subscribe({
                next: (customer) => {
                    const normalized = normalizeCustomerDates(customer);
                    this.customer.set(normalized);
                    this.loading.set(false);
                },
                error: (err) => {
                    this.error.set('Kunde konnte nicht geladen werden.');
                    this.loading.set(false);
                },
            });
        } else {
            this.error.set('Keine Kunden-ID angegeben.');
            this.loading.set(false);
        }
    }
}

