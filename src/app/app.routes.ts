import { Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./routes/documentation/documentation.component').then(
        (m) => m.DocumentationComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./routes/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'features',
    loadComponent: () =>
      import('./routes/features/features.component').then(
        (m) => m.FeaturesComponent
      ),
  },
  {
    path: 'signin',
    loadComponent: () =>
      import('./routes/signin/signin.component').then((m) => m.SigninComponent),
  },
];
