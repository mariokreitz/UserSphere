export interface UserInterface {
    uid: string;
    email: string;
    username: string;
    photoURL: string;
    emailVerified: boolean;
    UserMetadata: {
        creationTime: string | null;
        lastSignInTime: string | null;
    };
}

export interface CrmUserProfile extends UserInterface {
    phone?: string;
    role: 'admin' | 'sales' | 'support' | 'user';
    department?: string;
    position?: string;
    teams?: string[];
    permissions: string[];
    assignedCustomers?: string[];
    openTasks?: number;
    notes?: string;
    settings?: {
        language: string;
        notifications: boolean;
        theme: 'light' | 'dark';
    };
    address?: {
        street: string;
        city: string;
        postalCode: string;
        country: string;
    };
    birthday?: Date;
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}