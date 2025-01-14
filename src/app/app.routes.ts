import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { AdminDashboardComponent } from './features/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './features/user-dashboard/user-dashboard.component';
import { AdminGuard } from './core/auth/admin-guard.guard';
import { UserGuard } from './core/auth/user-guard.guard';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'user-dashboard',
    component: UserDashboardComponent,
    canActivate: [UserGuard],
  },
  { path: '**', redirectTo: 'login' },
];
