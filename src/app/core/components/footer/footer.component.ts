import {Component} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton} from '@angular/material/button';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [
    MatToolbar,
    MatButton,
    RouterModule,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  public year = new Date().getFullYear();

}
