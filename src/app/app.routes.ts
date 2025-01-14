import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { AdminGuard } from './core/auth/admin-guard.guard';
import { UserGuard } from './core/auth/user-guard.guard';
import { RegisterComponent } from './features/register/register.component';
import { UserManagementComponent } from './features/admin-dashboard/user-management/user-management.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'management',
        title: 'UserManagementComponent',
        component: UserManagementComponent,
      },
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
  },
  { path: '**', component: NotFoundComponent },
];
