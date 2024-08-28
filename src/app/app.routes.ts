import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './shared/layouts/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'files',
    loadChildren: () =>
      import('./files-manager/files.routes').then((r) => r.FILES_ROUTES),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: ErrorComponent,
  },
];
