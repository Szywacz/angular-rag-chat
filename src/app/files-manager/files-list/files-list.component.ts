import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import File from '../../shared/types/File';
import MOCK_FILES from '../../shared/mocks/mockFiles';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-files-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './files-list.component.html',
  styleUrl: './files-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilesListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<File>();

  filesObservable: Observable<File[]> = MOCK_FILES;

  files = toSignal<File[], File[]>(this.filesObservable, { initialValue: [] });

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.files();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteFile(fileId: string) {
    console.log(fileId);
  }

  createFile() {
    console.log('create new file');
  }
}
