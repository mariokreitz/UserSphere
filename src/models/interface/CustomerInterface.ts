export interface Customer {
    id: string;

    firstName: string;
    lastName: string;
    company?: string;
    position?: string;

    email: string;
    phoneNumber?: string;
    mobileNumber?: string;

    address?: {
        street: string;
        houseNumber: string;
        postalCode: string;
        city: string;
        country: string;
    };

    customerType: 'lead' | 'prospect' | 'customer' | 'former';
    category?: string;
    tags?: string[];

    assignedTo?: string; // Verantwortlicher Mitarbeiter (ID)

    createdAt: Timestamp | Date;
    updatedAt: Timestamp | Date;
    lastContactDate?: Timestamp | Date;

    // Referenzen (IDs werden später mit entsprechenden Services aufgelöst)
    activityIds?: string[];
    documentIds?: string[];

    notes?: string;
}

interface Timestamp {
    seconds: number;
    nanoseconds: number;
}