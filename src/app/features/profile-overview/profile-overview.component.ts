import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../core/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { UserService } from '../../shared/services/user.service';
import { EditUserDialogComponent } from '../../shared/components/edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-profile-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.scss'],
})
export class ProfileOverviewComponent implements OnInit {
  user: User | null = null;
  isLoading = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((userData) => {
      this.user = userData;
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '500px',
      data: {
        user,
        isAdmin: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.userService.updateUser(user).subscribe({
          next: (response) => {
            this.userService.setUser(response);
            this.isLoading = false;
            this.snackbarService.showSuccess(response.message);
          },
          error: (err) => {
            this.isLoading = false;
            this.snackbarService.showError(err.error.message);
          },
        });
      }
    });
  }
}
