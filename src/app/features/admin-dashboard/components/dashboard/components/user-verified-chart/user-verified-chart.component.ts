import { Component, Input } from '@angular/core';
import { ChartOptions, Plugin } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { User } from '../../../../../../core/models/user.model';

@Component({
  selector: 'app-user-verified-chart',
  imports: [BaseChartDirective],
  templateUrl: './user-verified-chart.component.html',
  styleUrls: ['./user-verified-chart.component.scss'],
})
export class UserVerifiedChartComponent {
  @Input() userData: User[] = [];

  chartData = {
    labels: ['Verified Users', 'Unverified Users'],
    datasets: [
      {
        data: [0, 1],
        backgroundColor: ['#4caf50', '#f44336'],
      },
    ],
  };

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  chartPlugins: Plugin[] = [
    {
      id: 'doughnutText',
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const width = chart.width;
        const height = chart.height;

        const fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + 'em Arial';
        ctx.textBaseline = 'middle';

        const totalUsers = this.userData.length;

        const text = `${totalUsers}`;

        const textWidth = ctx.measureText(text).width;

        const textX = (width - textWidth) / 2;
        const textY = height - 52;

        ctx.fillStyle = '#000';
        ctx.fillText(text, textX, textY);
      },
    },
  ];

  constructor() {}

  ngOnChanges(): void {
    const verifiedUsers = this.userData.filter(
      (user) => user.isVerified
    ).length;
    const unverifiedUsers = this.userData.length - verifiedUsers;

    this.chartData = {
      labels: ['Verified Users', 'Unverified Users'],
      datasets: [
        {
          data: [verifiedUsers, unverifiedUsers],
          backgroundColor: ['#4caf50', '#f44336'],
        },
      ],
    };
  }
}
