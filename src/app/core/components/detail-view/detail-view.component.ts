import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
    selector: 'app-detail-view',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
    ],
    templateUrl: './detail-view.component.html',
    styleUrl: './detail-view.component.scss',
})
export class DetailViewComponent<T> {
    @Input() title: string = 'Details';
    @Input() data!: T;
    @Input() loading: boolean = false;
    @Input() showEditButton: boolean = true;
    @Input() showDeleteButton: boolean = true;
    @Input() editButtonText: string = 'Bearbeiten';
    @Input() deleteButtonText: string = 'Löschen';
    @Input() fields: Array<{
        key: string;
        label: string;
        template?: TemplateRef<any>;
    }> = [];
    @Input() contentTemplate!: TemplateRef<any>;
    @Input() actionsTemplate!: TemplateRef<any>;
    @Input() tabs?: Array<{
        label: string;
        content: TemplateRef<any>;
    }>;

    @Output() onBack = new EventEmitter<void>();
    @Output() onEdit = new EventEmitter<void>();
    @Output() onDelete = new EventEmitter<void>();

    getPropertyValue(item: any, propertyPath: string): any {
        if (!item) return '';

        const parts = propertyPath.split('.');
        let value = item;

        for (const part of parts) {
            if (value === null || value === undefined) return '';
            value = value[part];
        }

        return value;
    }
}