import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/login/login.component';
import { NotFoundComponent } from './routes/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        title: 'UserSphere - Startseite',
        component: HomeComponent,
    },
    {
        path: 'login',
        title: 'UserSphere - Login',
        component: LoginComponent,
    },
    {
        path: 'dashboard',
        title: 'UserSphere - Dashboard',
        canActivate: [ AuthGuard ],
        loadComponent: () => import('./routes/dashboard/dashboard.component').then(m => m.DashboardComponent),
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'overview',
            },
            {
                path: 'customers',
                children: [
                    {
                        path: '',
                        title: 'UserSphere - Kundenliste',
                        loadComponent: () => import('./components/customer-list/customer-list.component').then(m => m.CustomerListComponent),

                    },
                    {
                        path: 'details/:id',
                        title: 'UserSphere - Kundendetails',
                        loadComponent: () => import('./core/components/detail-view/detail-view.component').then(m => m.DetailViewComponent),

                    },
                ],
            },
            {
                path: 'profile/:id',
                title: 'UserSphere - Profil',
                canActivate: [ AuthGuard ],
                loadComponent: () => import('./routes/profile/profile.component').then(m => m.ProfileComponent),
            },
            {
                path: 'settings',
                title: 'UserSphere - Einstellungen',
                canActivate: [ AuthGuard ],
                loadComponent: () => import('./routes/settings/settings.component').then(m => m.SettingsComponent),
            },
            {
                path: 'overview',
                title: 'UserSphere - Übersicht',
                canActivate: [ AuthGuard ],
                loadComponent: () => import('./routes/overview/overview.component').then(m => m.OverviewComponent),
            },
        ],
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'UserSphere - 404',
    },
];