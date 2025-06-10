import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatButtonModule,
        RouterOutlet,

    ],
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
    private themeService = inject(ThemeService);
    private iconRegistry = inject(MatIconRegistry);
    private sanitizer = inject(DomSanitizer);

    constructor() {
        const iconNames = [
            'google',
            'github',
            'login',
        ];
        iconNames.forEach(name =>
          this.iconRegistry.addSvgIcon(
            name,
            this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${name}.svg`),
          ),
        );
    }

    ngOnInit(): void {
        this.themeService.loadTheme();
    }

}