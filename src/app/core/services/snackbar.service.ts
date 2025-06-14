import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

export type SnackbarType = 'success' | 'error' | 'warning' | 'info';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
    private static readonly typeClassMap: Record<SnackbarType, string[]> = {
        success: [ 'snackbar-success' ],
        error: [ 'snackbar-error' ],
        warning: [ 'snackbar-warning' ],
        info: [ 'snackbar-info' ],
    };
    private snackBar = inject(MatSnackBar);

    show(
      message: string,
      config: MatSnackBarConfig = {},
      type: SnackbarType = 'info',
      action: string = '',
    ): MatSnackBarRef<TextOnlySnackBar> {
        const baseClasses = SnackbarService.typeClassMap[type];
        const userClasses = config.panelClass
          ? Array.isArray(config.panelClass)
            ? config.panelClass
            : [ config.panelClass ]
          : [];
        const mergedConfig: MatSnackBarConfig = {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            ...config,
            panelClass: [
                ...baseClasses,
                ...userClasses,
            ],
        };

        return this.snackBar.open(message, action, mergedConfig);
    }

    success(message: string, config: MatSnackBarConfig = {}, action: string = '') {
        return this.show(message, config, 'success', action);
    }

    error(message: string, config: MatSnackBarConfig = {}, action: string = '') {
        return this.show(message, config, 'error', action);
    }

    warning(message: string, config: MatSnackBarConfig = {}, action: string = '') {
        return this.show(message, config, 'warning', action);
    }

    info(message: string, config: MatSnackBarConfig = {}, action: string = '') {
        return this.show(message, config, 'info', action);
    }
}
