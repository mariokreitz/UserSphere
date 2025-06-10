import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Activity } from '../../../models/interface/ActivityInterface';
import { FirestoreService } from './firestore.service';

@Injectable({
    providedIn: 'root',
})
export class ActivityService extends FirestoreService<Activity> {
    constructor(firestore: AngularFirestore) {
        super(firestore, 'activities');
    }

    getActivitiesByType(type: 'call' | 'meeting' | 'email' | 'note' | 'task' | 'other'): Observable<Activity[]> {
        return this.query(ref => ref.where('type', '==', type));
    }

    getActivitiesForCustomer(customerId: string): Observable<Activity[]> {
        return this.query(ref => ref.where('customerId', '==', customerId));
    }

    getOpenActivities(): Observable<Activity[]> {
        return this.query(ref =>
          ref.where('status', 'in', [
              'planned',
              'in-progress',
          ])
            .orderBy('scheduledAt'),
        );
    }

    getUpcomingActivities(): Observable<Activity[]> {
        const now = new Date();
        return this.query(ref =>
          ref.where('scheduledAt', '>=', now)
            .where('status', 'in', [
                'planned',
                'in-progress',
            ])
            .orderBy('scheduledAt'),
        );
    }

    getActivitiesForEmployee(employeeId: string): Observable<Activity[]> {
        return this.query(ref => ref.where('assignedTo', '==', employeeId));
    }

    updateActivityStatus(id: string, newStatus: 'planned' | 'in-progress' | 'completed' | 'canceled'): Observable<void> {
        return this.update(id, {
            status: newStatus,
            ...(newStatus === 'completed' ? { completedAt: new Date() } : {}),
        });
    }
}