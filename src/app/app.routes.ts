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
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'overview',
            },
            {
                path: 'profile/:id',
                loadComponent: () => import('./routes/profile/profile.component').then(m => m.ProfileComponent),
                title: 'UserSphere - Profil',
                canActivate: [ AuthGuard ],
            },
            {
                path: 'settings',
                loadComponent: () => import('./routes/settings/settings.component').then(m => m.SettingsComponent),
                title: 'UserSphere - Einstellungen',
                canActivate: [ AuthGuard ],
            },
            {
                path: 'overview',
                loadComponent: () => import('./routes/overview/overview.component').then(m => m.OverviewComponent),
                title: 'UserSphere - Übersicht',
                canActivate: [ AuthGuard ],
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'UserSphere - 404',
    },
];