import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { AdminGuard } from './core/auth/admin-guard.guard';
import { UserGuard } from './core/auth/user-guard.guard';
import { RegisterComponent } from './features/register/register.component';
import { UserManagementComponent } from './features/admin-dashboard/components/user-management/user-management.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProfileOverviewComponent } from './features/profile-overview/profile-overview.component';
import { AuditLogsComponent } from './features/admin-dashboard/components/audit-logs/audit-logs.component';
import { DashboardComponent } from './features/admin-dashboard/components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardComponent,
      },
      {
        path: 'management',
        title: 'UserManagementComponent',
        component: UserManagementComponent,
      },
      {
        path: 'profile',
        title: 'ProfileOverviewComponent',
        component: ProfileOverviewComponent,
      },
      {
        path: 'audit',
        title: 'AuditLogsComponent',
        component: AuditLogsComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
    children: [
      {
        path: 'profile',
        title: 'ProfileOverviewComponent',
        component: ProfileOverviewComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
