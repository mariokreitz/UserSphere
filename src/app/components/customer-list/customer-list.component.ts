import { AfterViewInit, ChangeDetectorRef, Component, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { of, take } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Customer } from '../../../models/interface/CustomerInterface';
import { ListViewComponent } from '../../core/components/list-view/list-view.component';
import { CustomerService } from '../../core/services/customer.service';
import { SnackbarService } from '../../core/services/snackbar.service';

interface ColumnDefinition {
    key: string;
    label: string;
    sortable: boolean;
    template?: TemplateRef<any>;
}

@Component({
    selector: 'app-customer-list',
    imports: [
        ListViewComponent,
        MatIconModule,
        MatButtonModule,
    ],
    templateUrl: './customer-list.component.html',
    styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit, AfterViewInit {
    customers: Customer[] = [];
    loading = signal(false);
    columns: ColumnDefinition[] = [];

    readonly fullNameTpl = viewChild<TemplateRef<any>>('fullNameTpl');
    readonly typeTpl = viewChild<TemplateRef<any>>('typeTpl');
    readonly actionsColumnTpl = viewChild<TemplateRef<any>>('actionsColumnTpl');

    constructor(
      private customerService: CustomerService,
      private router: Router,
      private cdr: ChangeDetectorRef,
      private snackbarService: SnackbarService,
    ) {
    }

    ngOnInit() {
        this.loadCustomers();
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.initColumns();
            this.cdr.detectChanges();
        });
    }

    initColumns() {
        this.columns = [
            { key: 'id', label: 'ID', sortable: false },
            { key: 'fullName', label: 'Name', sortable: true, template: this.fullNameTpl() || undefined },
            { key: 'company', label: 'Firma', sortable: true },
            { key: 'email', label: 'E-Mail', sortable: true },
            { key: 'customerType', label: 'Kundentyp', sortable: true, template: this.typeTpl() || undefined },
            { key: 'action', label: 'Aktionen', sortable: false, template: this.actionsColumnTpl() || undefined },
        ];
    }

    loadCustomers() {
        this.loading.set(true);

        this.customerService.getAll()
          .pipe(
            take(1),
            catchError(err => {
                console.error('Fehler beim Laden der Kunden:', err);
                this.snackbarService.error('Kundendaten konnten nicht geladen werden');
                return of([]);
            }),
            finalize(() => {
                this.loading.set(false);
            }),
          )
          .subscribe({
              next: (customers) => {
                  this.customers = customers;
                  if (customers.length === 0) {
                      this.snackbarService.warning('Keine Kunden gefunden');
                  }
              },
          });
    }

    searchCustomers(query: string) {
        this.loading.set(true);

        this.customerService.searchCustomers(query)
          .pipe(finalize(() => this.loading.set(false)))
          .subscribe(customers => {
              this.customers = customers;
          });
    }

    onCustomerClick(customer: Customer) {
        this.router.navigate([
            '/dashboard/customers',
            customer.id,
        ]);
    }

    onAddCustomer() {
        this.router.navigate([ '/dashboard/customers/new' ]);
    }

    onEditCustomer(event: Event, customer: Customer) {
        event.stopPropagation();
        this.router.navigate([
            '/dashboard/customers',
            customer.id,
            'edit',
        ]);
    }

    onDeleteCustomer(event: Event, customer: Customer) {
        event.stopPropagation();
        if (confirm(`Möchten Sie ${customer.firstName} ${customer.lastName} wirklich löschen?`)) {
            this.customerService.delete(customer.id)
              .subscribe(() => this.loadCustomers());
        }
    }

    getCustomerTypeLabel(type: 'lead' | 'prospect' | 'customer' | 'former'): string {
        const types = {
            'lead': 'Lead',
            'prospect': 'Interessent',
            'customer': 'Kunde',
            'former': 'Ehemaliger Kunde',
        };
        return types[type];
    }

    public onPageChanged($event: PageEvent): void {
        console.log('Page changed:', $event);
        // Implement pagination logic here
    }

    public sortCustomers($event: Sort): void {
        console.log('Sort event:', $event);
        // Implement sorting logic here
        // For now, we just log the event
    }
}