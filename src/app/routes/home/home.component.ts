import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../core/components/footer/footer.component';
import { HeaderComponent } from '../../core/components/header/header.component';

@Component({
    selector: 'app-home',
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        RouterLink,
        HeaderComponent,
        FooterComponent,
        NgOptimizedImage,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent {

}
