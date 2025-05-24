import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

interface NavItem {
    id: number;
    icon: string;
    title: string;
    route: string;
}

@Component({
    selector: 'app-navbar',
    imports: [
        MatListModule,
        MatIconModule,
        RouterModule,
        MatTooltipModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, OnDestroy {
    public navItems: NavItem[] = [
        { id: 1, icon: 'home', title: 'Dashboard', route: '/dashboard' },
        { id: 2, icon: 'person', title: 'Profile', route: '/profile' },
        { id: 3, icon: 'settings', title: 'Settings', route: '/settings' },
    ];
    public isMobile = false;
    public expanded = true;

    private userService = inject(UserService);
    private router = inject(Router);
    private breakpointObserver = inject(BreakpointObserver);
    private breakpointSubscription!: Subscription;

    public ngOnInit(): void {
        this.navItems = this.navItems.map(item => {
            if (item.title === 'Profile') {
                return { ...item, route: `${item.route}/${this.userService.currentUser()?.uid}` };
            }
            return item;
        });

        this.checkScreenSize();

        this.breakpointSubscription = this.breakpointObserver
          .observe([
              Breakpoints.Handset,
              Breakpoints.Tablet,
          ])
          .subscribe(result => {
              this.isMobile = result.matches;
              this.expanded = !this.isMobile;
              const drawerElement = document.querySelector<HTMLElement>('.mat-drawer');
              if (drawerElement) {
                  drawerElement.style.width = 'unset';
              }
          });
    }

    public ngOnDestroy(): void {
        if (this.breakpointSubscription) {
            this.breakpointSubscription.unsubscribe();
        }
    }

    public navigate(route: string): void {
        this.router.navigate([ route ]);
        if (this.isMobile) {
            this.expanded = false;
        }
    }

    private checkScreenSize(): void {
        this.isMobile = this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.Tablet,
        ]);
        this.expanded = !this.isMobile;
    }

}
