import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '@components/breadcrumbs/breadcrumbs.component';

interface FileState {
  fileName: string | null;
}

@Component({
  selector: 'app-file-edit',
  standalone: true,
  imports: [BreadcrumbsComponent],
  templateUrl: './file-edit.component.html',
  styleUrl: './file-edit.component.scss',
})
export class FileEditComponent implements OnInit {
  fileName: string = '';

  constructor(private location: Location) {}

  ngOnInit() {
    this.fileName = (this.location?.getState() as FileState)?.fileName ?? '';
  }
}
