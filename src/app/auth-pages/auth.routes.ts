import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthLayoutComponent } from '../shared/layouts/auth-layout/auth-layout.component';
import { LoggedInGuard } from '../shared/guards/loggedIn.guard';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
