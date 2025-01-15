import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Log } from '../../../../core/models/log.model';

@Component({
  selector: 'app-audit-logs',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.scss',
})
export class AuditLogsComponent implements OnInit {
  logs: Log[] = [];
  paginationPages: number[] = [];
  totalPagesArray: number[] = [];
  startPage: number = 1;
  endPage: number = 1;
  currentPage: number = 1;
  totalPages: number = 1;
  limit: number = 5;
  filters = {
    user: '',
    action: '',
    startDate: '',
    endDate: '',
  };

  constructor(private adminService: AdminService) {}
  displayedColumns: string[] = [
    '_id',
    'user',
    'action',
    'details',
    'ip',
    'timestamp',
  ];

  ngOnInit(): void {
    this.fetchAuditLogs();
  }

  fetchAuditLogs(): void {
    this.adminService
      .getAuditLogs(this.currentPage, this.limit, this.filters)
      .subscribe((response) => {
        this.logs = response.logs;
        this.totalPages = Math.ceil(response.pagination.total / this.limit);

        this.totalPagesArray = Array.from(
          { length: this.totalPages },
          (_, i) => i + 1
        );
        this.updatePagination();
      });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchAuditLogs();
    }
  }

  resetFilters(): void {
    this.filters = { user: '', action: '', startDate: '', endDate: '' };
    this.fetchAuditLogs();
  }

  updatePagination(): void {
    const halfRange = Math.floor(this.limit / 2);

    this.startPage = Math.max(this.currentPage - halfRange, 2);
    this.endPage = Math.min(
      this.startPage + this.limit - 1,
      this.totalPages - 1
    );

    if (this.endPage === this.totalPages - 1) {
      this.startPage = Math.max(this.totalPages - this.limit, 2);
    }

    if (this.startPage === 2) {
      this.endPage = Math.min(this.limit, this.totalPages - 1);
    }

    this.paginationPages = Array.from(
      { length: this.endPage - this.startPage + 1 },
      (_, i) => this.startPage + i
    );
  }
}
