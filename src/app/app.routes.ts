import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth-guard.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login' },
];
