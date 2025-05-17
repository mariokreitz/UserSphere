import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
    ],
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent implements OnInit {
    private router = inject(Router);
    private userService = inject(UserService);

    protected isUserAuthenticated = this.userService.isAuthenticated;
    protected user = this.userService.currentUserSync;

    private authService = inject(AuthService);
    private fallbackName!: string;
    private fallbackPhotoUrl = 'user-circle.png';

    get userName(): string {
        return this.user()?.username || this.fallbackName;
    }

    get userPhotoUrl(): string {
        return this.user()?.photoURL || this.fallbackPhotoUrl;
    }

    ngOnInit() {
        const randomSuffix = Math.floor(Math.random() * 10000);
        this.fallbackName = `User${randomSuffix}`;

    }

    navigate(url: string) {
        if (this.isUserAuthenticated()) this.router.navigateByUrl('/dashboard');
        else this.router.navigateByUrl(url);

    }

    onLogout() {
        this.authService.logout().subscribe({
            next: () => {
                this.userService.currentUser.set(null);
                this.router.navigateByUrl('/');
            },
            error: () => {
                this.userService.currentUser.set(null);
                this.router.navigateByUrl('/');
            },
        });
    }
}
