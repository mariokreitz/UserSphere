import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, MatListModule, MatIcon],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isAdmin: boolean = false;

  constructor() {}

  get menuItems() {
    const items = [
      {
        label: 'User Management',
        link: './management',
        icon: 'group',
        hidden: !this.isAdmin,
      },
      {
        label: 'Dashboard',
        link: this.isAdmin ? '/admin' : '/user',
        icon: 'dashboard',
      },

      {
        label: 'User List',
        link: '/user-list',
        icon: 'list',
        hidden: !this.isAdmin,
      },
      {
        label: 'Statistics',
        link: '/statistics',
        icon: 'bar_chart',
        hidden: !this.isAdmin,
      },
      { label: 'User Profile', link: '/profile', icon: 'person' },
      { label: 'Settings', link: '/settings', icon: 'settings' },
    ].filter((item) => !item.hidden);

    return items;
  }
}
