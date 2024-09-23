import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '@components/breadcrumbs/breadcrumbs.component';
import { BreadcrumbsService } from '@components/breadcrumbs/breadcrumbs.service';
import { FileService } from '../files.service';
import File from '@shared/types/File';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-file-edit',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './file-edit.component.html',
  styleUrl: './file-edit.component.scss',
})
export class FileEditComponent {
  file!: File;

  constructor(
    private location: Location,
    private breadcrumbsService: BreadcrumbsService,
    private fileService: FileService,
  ) {
    this.setBreadcrumbLabel();
  }

  setBreadcrumbLabel() {
    const id = this.location.path().split('/').at(-1);
    if (!id) return;
    this.fileService
      .getFile(id)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (file) => this.breadcrumbsService.setCustomLastLabel(file.name),
        error: (error) => console.error('Error fetching file:', error),
      });
  }
}
