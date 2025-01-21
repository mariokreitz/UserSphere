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
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../../core/models/user.model';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../../../../shared/components/edit-user-dialog/edit-user-dialog.component';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-user-management',
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
      error: (err) => {
        console.error('Error fetching users', err);
      },
    });
  }

  filterUser(): void {
    const search = this.filters.search.toLowerCase();
    const roleFilter = this.filters.role.toLowerCase();

    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
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
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createUser(result);
      }
    });
  }

  createUser(userData: {
    username: string;
    email: string;
    password: string;
    role: string;
  }): void {
    this.adminService.createUser(userData).subscribe({
      next: (response) => {
        console.log(response);
        this.fetchUsers();
      },
      error: (err) => {
        console.error('Error creating user', err);
      },
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
            this.fetchUsers();

            const currentUser = this.userService.currentUser;
            if (currentUser && currentUser._id === user._id) {
              const updatedUser = { ...currentUser, ...result };
              this.userService.setUser(updatedUser);
            }

            console.log('User updated', response);
          },
          error: (err) => console.error('Error updating user', err),
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
          console.log(response);
          this.fetchUsers();
        },
        error: (err) => {
          console.error('Error deleting user', err);
        },
      });
    }
  }
}
