import { Component, Input, OnChanges } from '@angular/core';
import { ChartOptions, Plugin, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { User } from '../../../../../../core/models/user.model';

@Component({
  selector: 'app-user-new-chart',
  imports: [BaseChartDirective],
  templateUrl: './user-new-chart.component.html',
  styleUrls: ['./user-new-chart.component.scss'],
})
export class UserNewChartComponent implements OnChanges {
  @Input() userData: User[] = [];

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'New Users per Week',
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Week',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of New Users',
        },
      },
    },
  };

  constructor() {}

  ngOnChanges(): void {
    const weeksData = this.calculateWeeklyNewUsers();
    const labels = weeksData.map((week, index) => `KW ${index + 1}`);
    const data = weeksData.map((week) => week.newUsersCount);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          label: 'New Users per Week',
          borderColor: '#ff6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    };
  }

  private calculateWeeklyNewUsers(): {
    weekStart: Date;
    newUsersCount: number;
  }[] {
    const now = new Date();
    const weeksData = [];
    let startOfWeek = this.getStartOfWeek(now);

    for (let i = 0; i < 6; i++) {
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      const newUsersThisWeek = this.userData.filter((user) => {
        const createdAt = new Date(user.createdAt);
        return createdAt >= startOfWeek && createdAt <= endOfWeek;
      });

      weeksData.push({
        weekStart: startOfWeek,
        newUsersCount: newUsersThisWeek.length,
      });

      startOfWeek = new Date(startOfWeek);
      startOfWeek.setDate(startOfWeek.getDate() - 7);
    }

    return weeksData.reverse();
  }

  private getStartOfWeek(date: Date): Date {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day == 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return startOfWeek;
  }
}
