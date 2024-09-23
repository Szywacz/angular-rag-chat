import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import mockFiles from '@shared/mocks/mockFiles';
import File from '@shared/types/File';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = '/api/files';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<File[]> {
    // return this.http.get(this.apiUrl);
    return of(mockFiles);
  }

  getFile(id: string): Observable<File> {
    // return this.http.get(`${this.apiUrl}/${id}`);
    const mockId = Number.parseInt(id) - 1;
    const file: File = mockFiles[mockId]
    return of(file);
  }

  createFile(name: string, description: string, content: string): Observable<any> {
    return this.http.post(this.apiUrl, { name, description, content });
  }

  updateFile(id: string, content: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { content });
  }

  deleteFile(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
