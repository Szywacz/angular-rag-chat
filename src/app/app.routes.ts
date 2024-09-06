import { Routes } from '@angular/router';
import { ErrorComponent } from '@layouts/error/error.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from '@layouts/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { AdminComponent } from './admin/admin.component';

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
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'files',
        loadChildren: () => import('./files-manager/files.routes').then((r) => r.FILES_ROUTES),
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
      },
    ],
  },
  ...commonRedirects,
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
