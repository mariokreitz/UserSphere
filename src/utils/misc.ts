import { Customer } from '../models/interface/CustomerInterface';

private function convertTimestampToDate(value: any): Date | null {
    // Convert Firestore Timestamp to Date object
    // Firestore Timestamp: { seconds: number, nanoseconds: number }

    if (!value) return null;

    if (typeof value === 'object' && typeof value.seconds === 'number') {
        return new Date(value.seconds * 1000);
    }
    if (typeof value === 'string' || typeof value === 'number') {
        return new Date(value);
    }
    if (value instanceof Date) {
        return value;
    }
    return null;
}

export function normalizeCustomerDates(customer: Customer): any {
    if (!customer) return customer;
    return {
        ...customer,
        createdAt: convertTimestampToDate(customer.createdAt),
        updatedAt: convertTimestampToDate(customer.updatedAt),
        lastContactDate: convertTimestampToDate(customer.lastContactDate),
    };
}