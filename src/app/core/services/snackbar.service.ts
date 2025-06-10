import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnackbarService {
    private snackBar = inject(MatSnackBar);

    show(
      message: string,
      action: string = '',
      config: Partial<MatSnackBarConfig> = {},
    ) {
        const defaultConfig: MatSnackBarConfig = {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: [ 'app-snackbar' ],
        };

        const mergedConfig = { ...defaultConfig, ...config };
        this.snackBar.open(message, action, mergedConfig);
    }

    success(message: string, action = 'OK') {
        this.show(message, action, { panelClass: [ 'snackbar-success' ] });
    }

    error(message: string, action = 'RETRY') {
        this.show(message, action, { panelClass: [ 'snackbar-error' ], duration: 5000 });
    }

    warning(message: string, action = 'DISMISS') {
        this.show(message, action, { panelClass: [ 'snackbar-warning' ], duration: 5000 });
    }
}
