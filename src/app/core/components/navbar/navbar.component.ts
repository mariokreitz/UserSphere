import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavItem } from '../../../../models/types/navbarItem';
import { NAV_ITEMS } from '../../config/nav.config';

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
    public navItems: NavItem[] = [];
    public isMobile = false;

    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private breakpointObserver = inject(BreakpointObserver);
    private breakpointSubscription!: Subscription;

    public ngOnInit(): void {
        this.navItems = NAV_ITEMS;
        this.checkScreenSize();

        this.breakpointSubscription = this.breakpointObserver
          .observe([
              Breakpoints.Handset,
              Breakpoints.Tablet,
          ])
          .subscribe(result => {
              this.isMobile = result.matches;
          });
    }

    public ngOnDestroy(): void {
        this.breakpointSubscription?.unsubscribe();
    }

    public navigate(route: string): void {
        if (route.startsWith('/')) {
            this.router.navigate([ route ]);
            return;
        }

        const currentPath = this.router.url;
        const basePath = currentPath.split('/')[1];
        const targetPath = `/${basePath}/${route}`;

        this.router.navigate([ targetPath ]);
    }

    private checkScreenSize(): void {
        this.isMobile = this.breakpointObserver.isMatched([
            Breakpoints.Handset,
            Breakpoints.Tablet,
        ]);
    }
}