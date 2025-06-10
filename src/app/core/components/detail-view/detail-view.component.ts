import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../../../../models/interface/CustomerInterface';
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
    providers: [ DatePipe ],
})
export class DetailViewComponent implements OnInit {
    customer = signal<Customer | null>(null);
    loading = signal<boolean>(true);
    error = signal<string | null>(null);
    private route = inject(ActivatedRoute);
    private customerService = inject(CustomerService);
    private datePipe = inject(DatePipe);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.customerService.getById(id).subscribe({
                next: (customer) => {
                    this.customer.set(customer);
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

    formatDate(date: any): string {
        if (!date) return '';

        if (date instanceof Date) {
            return this.datePipe.transform(date, 'short') || '';
        } else if (date && typeof date === 'object' && 'seconds' in date) {
            return this.datePipe.transform(new Date(date.seconds * 1000), 'short') || '';
        }

        return this.datePipe.transform(date, 'short') || '';
    }
}

