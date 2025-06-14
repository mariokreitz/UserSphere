import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { CustomerFormDialogComponent } from './dialog/customer-form.component';

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
        MatDialogModule,
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

    private customerService: CustomerService = inject(CustomerService);
    private router: Router = inject(Router);
    private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
    private snackbarService: SnackbarService = inject(SnackbarService);
    private dialog = inject(MatDialog);

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
            'details',
            customer.id,
        ]);
    }

    onAddCustomer() {
        const dialogRef = this.dialog.open(CustomerFormDialogComponent, {
            width: '600px',
            data: { isNewCustomer: true },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.customerService.create(result)
                  .subscribe({
                      next: () => {
                          this.snackbarService.success('Kunde erfolgreich erstellt');
                          this.loadCustomers();
                      },
                      error: (err) => {
                          console.error('Fehler beim Erstellen des Kunden:', err);
                          this.snackbarService.error('Kunde konnte nicht erstellt werden');
                      },
                  });
            }
        });
    }

    onEditCustomer(event: Event, customer: Customer) {
        event.stopPropagation();
        const dialogRef = this.dialog.open(CustomerFormDialogComponent, {
            width: '600px',
            data: { isNewCustomer: false, customer },
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.customerService.update(customer.id, result)
                  .subscribe({
                      next: () => {
                          this.snackbarService.success('Kunde erfolgreich erstellt');
                          this.loadCustomers();
                      },
                      error: (err) => {
                          console.error('Fehler beim Erstellen des Kunden:', err);
                          this.snackbarService.error('Kunde konnte nicht erstellt werden');
                      },
                  });
            }
        });
    }

    onDeleteCustomer(event: Event, customer: Customer) {
        event.stopPropagation();
        if (confirm(`Möchten Sie ${customer.firstName} ${customer.lastName} wirklich löschen?`)) {
            this.customerService.delete(customer.id)
              .subscribe({
                  next: () => {
                      this.snackbarService.success('Kunde erfolgreich gelöscht');
                      this.loadCustomers();
                  },
                  error: (err) => {
                      console.error('Fehler beim Löschen des Kunden:', err);
                      this.snackbarService.error('Kunde konnte nicht gelöscht werden');
                  },
              });
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