import { Route } from '@angular/router';
import { FilesListComponent } from './files-list/files-list.component';
import { FileEditComponent } from './file-edit/file-edit.component';

export const FILES_ROUTES: Route[] = [
  {
    path: '',
    component: FilesListComponent,
  },
  {
    path: ':id',
    component: FileEditComponent,
  },
];
