import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  statistics = [
    {
      value: 'Contact Management',
      label: 'Efficient Customer Management',
      description:
        'Store, manage, and access all customer data in one centralized location.',
    },
    {
      value: 'Email Integration',
      label: 'Seamless Email Communication',
      description:
        'Directly integrate emails for centralized processing and tracking.',
    },
    {
      value: 'Document Management',
      label: 'Centralized File Storage',
      description: 'Store, organize, and share important files securely.',
    },
    {
      value: 'Appointment Scheduling',
      label: 'Optimized Time Management',
      description:
        'Easily create, manage, and synchronize appointments with clients.',
    },
    {
      value: 'Mass Emails and Letters',
      label: 'Automated Customer Outreach',
      description:
        'Send personalized bulk emails and letters for targeted campaigns.',
    },
    {
      value: 'Sales Opportunities',
      label: 'Identify Sales Potentials',
      description:
        'Capture and track new leads and opportunities systematically.',
    },
  ];

  currentStatIndex = 0;
  private autoSlideSubscription?: Subscription;

  ngOnInit() {
    this.autoSlideSubscription = interval(4000).subscribe(() => {
      this.currentStatIndex =
        (this.currentStatIndex + 1) % this.statistics.length;
    });
  }

  ngOnDestroy() {
    if (this.autoSlideSubscription) {
      this.autoSlideSubscription.unsubscribe();
    }
  }

  setCurrentStat(index: number) {
    this.currentStatIndex = index;
  }
}
