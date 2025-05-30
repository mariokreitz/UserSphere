import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { doc, docData, Firestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterface } from '../../../models/types/UserInterface';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        MatTabsModule,
        MatTooltipModule,
        MatMenuModule,
        MatChipsModule,
        MatDialogModule,
        RouterModule,
        DatePipe,
    ],
    templateUrl: './profile.component.html',
    styleUrls: [ './profile.component.scss' ],
    providers: [ DatePipe ],
})
export class ProfileComponent implements OnInit {
    protected userData$!: Observable<UserInterface>;
    private route = inject(ActivatedRoute);
    private firestore = inject(Firestore);

    ngOnInit(): void {
        const uid = this.route.snapshot.params['id'];
        const userRef = doc(this.firestore, `users/${uid}`);
        this.userData$ = docData(userRef, { idField: 'uid' }) as Observable<UserInterface>;
    }
}
