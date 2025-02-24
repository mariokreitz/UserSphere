import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { AdminGuard } from './core/auth/admin-guard.guard';
import { UserGuard } from './core/auth/user-guard.guard';
import { RegisterComponent } from './features/register/register.component';
import { UserManagementComponent } from './features/admin-dashboard/components/user-management/user-management.component';
import { NotFoundComponent } from './pages/404/not-found.component';
import { ProfileOverviewComponent } from './features/profile-overview/profile-overview.component';
import { AuditLogsComponent } from './features/admin-dashboard/components/audit-logs/audit-logs.component';
import { DashboardComponent } from './features/admin-dashboard/components/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserSettingsComponent } from './features/user-settings/user-settings.component';

export const routes: Routes = [
  {
    path: '',
    title: 'UserSphere',
    component: HomeComponent,
    children: [
      {
        path: 'register',
        title: 'UserSphere Register',
        component: RegisterComponent,
      },
      { path: 'login', title: 'UserSphere Login', component: LoginComponent },
    ],
  },
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
        title: 'User Management',
        component: UserManagementComponent,
      },
      {
        path: 'profile',
        title: 'Profile Overview',
        component: ProfileOverviewComponent,
      },
      {
        path: 'audit',
        title: 'Audit Logs',
        component: AuditLogsComponent,
      },
      {
        path: 'settings',
        title: 'Settings',
        component: UserSettingsComponent,
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
        title: 'Profile Overview',
        component: ProfileOverviewComponent,
      },
      {
        path: 'settings',
        title: 'Settings',
        component: UserSettingsComponent,
      },
    ],
  },
  { path: '**', title: 'Not Found', component: NotFoundComponent },
];
