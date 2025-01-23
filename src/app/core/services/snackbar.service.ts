import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  private readonly verticalPosition: MatSnackBarVerticalPosition = 'top';
  private readonly defaultDuration: number = 3000;

  constructor(private snackBar: MatSnackBar) {}

  private openSnackbar(
    message: string,
    action: string = 'OK',
    panelClass: string | string[] = ''
  ): void {
    this.snackBar.open(message, action, {
      duration: this.defaultDuration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass,
    });
  }

  showSuccess(message: string): void {
    this.openSnackbar(message, 'OK', 'mat-mdc-snack-bar-success');
  }

  showError(message: string): void {
    this.openSnackbar(message, 'OK', 'mat-mdc-snack-bar-error');
  }

  showMessage(message: string, action: string = 'OK'): void {
    this.openSnackbar(message, action);
  }
}
