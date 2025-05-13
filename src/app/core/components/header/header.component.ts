import {Component, inject} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private router = inject(Router)

  public navigate(url: string): void {
    this.router.navigateByUrl(url)
  }
}
