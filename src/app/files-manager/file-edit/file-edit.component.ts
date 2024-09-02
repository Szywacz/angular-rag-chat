import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '@components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-file-edit',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './file-edit.component.html',
  styleUrl: './file-edit.component.scss',
})
export class FileEditComponent {}
