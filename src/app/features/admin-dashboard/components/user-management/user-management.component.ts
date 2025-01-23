import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { User } from '../../../../core/models/user.model';
import { AdminService } from '../../services/admin.service';
import { UserService } from '../../../../shared/services/user.service';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../../../../shared/components/edit-user-dialog/edit-user-dialog.component';
import { SnackbarService } from '../../../../core/services/snackbar.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
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
    MatChipsModule,
    MatTooltipModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  filters = { search: '', role: '' };

  displayedColumns: Array<keyof User | 'actions'> = [
    'username',
    'email',
    'firstName',
    'lastName',
    'role',
    'isVerified',
    'createdAt',
    'updatedAt',
    'actions',
  ];

  constructor(
    private snackbarService: SnackbarService,
    private adminService: AdminService,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      error: (err) => this.snackbarService.showError(err),
    });
  }

  filterUser(): void {
    const search = this.filters.search.toLowerCase().trim();
    const roleFilter = this.filters.role.toLowerCase();

    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
        search === '' ||
        user.username.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.firstName.toLowerCase().includes(search) ||
        user.lastName.toLowerCase().includes(search);

      const matchesRole =
        roleFilter === '' || user.role.toLowerCase() === roleFilter;

      return matchesSearch && matchesRole;
    });
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.createUser(result).subscribe({
          next: (response) => {
            this.fetchUsers();
            this.snackbarService.showSuccess(response.message);
          },
          error: (err) => {
            this.snackbarService.showError(err.error.message);
          },
        });
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: { user, isAdmin: true },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.adminService.updateUser(user._id, result).subscribe({
          next: (response) => {
            this.snackbarService.showSuccess(response.message);
            this.fetchUsers();
            if (this.userService.currentUser?._id === user._id) {
              this.userService.setUser({
                ...this.userService.currentUser,
                ...result,
              });
            }
          },
          error: (err: Error) => this.snackbarService.showError(err.message),
        });
      }
    });
  }

  deleteUser({ _id: id, username }: User): void {
    const confirmation = window.confirm(
      `Are you sure you want to delete user ${username}?`
    );

    if (confirmation) {
      this.adminService.deleteUser(id).subscribe({
        next: (response) => {
          this.fetchUsers();
          this.snackbarService.showSuccess(response.message);
        },

        error: (err: Error) => this.snackbarService.showError(err.message),
      });
    }
  }
}
