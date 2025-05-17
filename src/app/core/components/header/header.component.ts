import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-header',
    imports: [
        MatToolbar,
        MatIcon,
        MatButtonModule,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})
export class HeaderComponent {
    private router = inject(Router);
    private userService = inject(UserService);

    public navigate(url: string): void {
        if (this.userService.isAuthenticated()) this.router.navigateByUrl('/dashboard');
        else this.router.navigateByUrl(url);
    }
}
