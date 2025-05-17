import { Routes } from '@angular/router';
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
        path: '**',
        component: NotFoundComponent,
        title: 'UserSphere - 404',
    },
];
