import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private apiUrl = '/api/files';

  constructor(private http: HttpClient) {}

  getFiles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getFile(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
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
