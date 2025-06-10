import { CommonModule } from '@angular/common';
import { Component, input, output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-list-view',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './list-view.component.html',
    styleUrl: './list-view.component.scss',
})
export class ListViewComponent<T> {
    readonly title = input<string>('Liste');
    readonly items = input<T[]>([]);
    readonly columns = input<Array<{
        key: string;
        label: string;
        sortable?: boolean;
        template?: TemplateRef<any>;
    }>>([]);
    readonly loading = input<boolean>(false);
    readonly showSearch = input<boolean>(true);
    readonly showPaginator = input<boolean>(true);
    readonly showAddButton = input<boolean>(true);
    readonly addButtonText = input<string>('Neu erstellen');
    readonly noDataMessage = input<string>('Keine Daten vorhanden');
    readonly pageSize = input<number>(10);
    readonly pageSizeOptions = input<number[]>([
        5,
        10,
        25,
        50,
    ]);
    readonly onRowClick = output<T>();
    readonly onAdd = output<void>();
    readonly onSearch = output<string>();
    readonly onPageChanged = output<PageEvent>();
    readonly onSortChanged = output<Sort>();

    protected searchTerm: string = '';

    protected readonly actionsColumnTemplate = input<TemplateRef<any> | null>(null);
    protected readonly actionsTemplate = input<TemplateRef<any> | null>(null);

    onSearchChange() {
        if (this.searchTerm.trim()) {
            this.onSearch.emit(this.searchTerm);
        }
    }

    onSort(event: Sort) {
        this.onSortChanged.emit(event);
    }

    getPropertyValue(item: any, key: string): any {
        return key.split('.').reduce((o, k) => (o || {})[k], item);
    }

    getColumnKeys(): string[] {
        const keys = this.columns().map(col => col.key);
        if (this.actionsColumnTemplate()) {
            keys.push('actions');
        }
        return keys;
    }
}