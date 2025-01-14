import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { User } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, MatIcon],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.fetchUserProfile().subscribe((userData) => {
      this.user = userData;
    });
  }
}
