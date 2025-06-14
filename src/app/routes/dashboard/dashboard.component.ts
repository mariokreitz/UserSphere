import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../core/components/header/header.component';
import { NavbarComponent } from '../../core/components/navbar/navbar.component';

@Component({
    selector: 'app-dashboard',
    imports: [
        RouterOutlet,
        HeaderComponent,
        NavbarComponent,
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {

}