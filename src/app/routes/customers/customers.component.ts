import { Component } from '@angular/core';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';

@Component({
    selector: 'app-customers',
    imports: [
        CustomerListComponent,
    ],
    templateUrl: './customers.component.html',
    styleUrl: './customers.component.scss',
})
export class CustomersComponent {

}
