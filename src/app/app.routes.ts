import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'UserSphere - Startseite',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'UserSphere - Login',
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./routes/dashboard/dashboard.component').then(m => m.DashboardComponent),
        title: 'UserSphere - Dashboard',
        canActivate: [ AuthGuard ],
    },
    {
        path: 'profile/:id',
        loadComponent: () => import('./routes/profile/profile.component').then(m => m.ProfileComponent),
        title: 'UserSphere - Profil',
        canActivate: [ AuthGuard ],
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'UserSphere - 404',
    },
];
