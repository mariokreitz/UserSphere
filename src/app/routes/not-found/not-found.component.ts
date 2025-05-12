import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Location} from '@angular/common';

@Component({
  selector: 'app-not-found',
  imports: [
    MatIcon,
    MatButtonModule
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
