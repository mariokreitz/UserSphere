import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer } from '../../../models/interface/CustomerInterface';
import { FirestoreService } from './firestore.service';

@Injectable({
    providedIn: 'root',
})
export class CustomerService extends FirestoreService<Customer> {
    constructor(firestore: AngularFirestore) {
        super(firestore, 'customers');
    }

    searchCustomers(query: string): Observable<Customer[]> {
        query = query.toLowerCase().trim();
        if (!query) return this.getAll();

        return this.getAll().pipe(
          map(customers => customers.filter(customer =>
            customer.firstName.toLowerCase().includes(query) ||
            customer.lastName.toLowerCase().includes(query) ||
            (customer.company && customer.company.toLowerCase().includes(query)) ||
            customer.email.toLowerCase().includes(query),
          )),
        );
    }

    getCustomersByType(type: 'lead' | 'prospect' | 'customer' | 'former'): Observable<Customer[]> {
        return this.query(ref => ref.where('customerType', '==', type));
    }

    getUnassignedCustomers(): Observable<Customer[]> {
        return this.query(ref => ref.where('assignedTo', '==', null));
    }

    updateContactDetails(id: string, email: string, phoneNumber?: string, mobileNumber?: string): Observable<void> {
        return this.update(id, {
            email,
            phoneNumber,
            mobileNumber,
            updatedAt: { seconds: Date.now() / 1000, nanoseconds: 0 }, // Firestore Timestamp format
        });
    }

    updateCustomerType(id: string, newType: 'lead' | 'prospect' | 'customer' | 'former'): Observable<void> {
        return this.update(id, {
            customerType: newType,
        });
    }
}