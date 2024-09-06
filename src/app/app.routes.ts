import { Routes } from '@angular/router';
import { ErrorComponent } from './shared/layouts/error/error.component';
import { AuthGuard } from './shared/guards/auth.guard';

const commonRedirects: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: '/auth/login',
  },
  {
    path: 'register',
    pathMatch: 'full',
    redirectTo: '/auth/register',
  },
];

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/files',
  },
  ...commonRedirects,
  {
    path: 'files',
    loadChildren: () => import('./files-manager/files.routes').then((r) => r.FILES_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-pages/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorComponent,
  },
];
