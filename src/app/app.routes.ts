import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./routes/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./routes/signin/signin.component').then((m) => m.SigninComponent),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
