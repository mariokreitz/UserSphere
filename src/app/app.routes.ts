import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./routes/signin/signin.component').then((m) => m.SigninComponent),
  },
];
