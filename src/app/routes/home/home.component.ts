import {Component} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    RouterLink
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
