import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from '../../../../core/models/user.model';
import { UserVerifiedChartComponent } from './components/user-verified-chart/user-verified-chart.component';
import { UserNewChartComponent } from './components/user-new-chart/user-new-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [UserVerifiedChartComponent, UserNewChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  userData: User[] = [];
  constructor(private adminService: AdminService) {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getUsers().subscribe((users) => {
      this.userData = users;
    });
  }
}
