export interface Activity {
    id?: string;

    type: 'call' | 'meeting' | 'email' | 'note' | 'task' | 'other';
    title: string;
    description?: string;

    scheduledAt?: Date;
    completedAt?: Date;

    status: 'planned' | 'in-progress' | 'completed' | 'canceled';

    customerId: string;
    assignedTo?: string;

    callDetails?: {
        direction: 'incoming' | 'outgoing';
        duration?: number;     // in seconds
        phoneNumber?: string;
    };

    meetingDetails?: {
        location?: string;
        duration?: number;     // in minutes
        participants?: string[];
    };

    emailDetails?: {
        subject?: string;
        sender?: string;
        recipients?: string[];
        messageId?: string;
    };

    taskDetails?: {
        dueDate?: Date;
        priority?: 'low' | 'medium' | 'high';
        progress?: number;     // 0-100%
    };

    documentIds?: string[];

    createdAt: Date;
    updatedAt: Date;
    createdBy?: string;

    tags?: string[];
    outcome?: string;
    followUpRequired?: boolean;
    followUpDate?: Date;
}