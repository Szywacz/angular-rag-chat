import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User, { Role } from '@shared/types/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class AdminService {
  private readonly userApiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.userApiUrl}/${userId}`);
  }

  updateUserRole(userId: string, role: Role): Observable<User> {
    return this.http.patch<User>(`${this.userApiUrl}/${userId}`, role);
  }

  deleteUser(userId: string): Observable<{ userId: string }> {
    return this.http.delete<{ userId: string }>(`${this.userApiUrl}/${userId}`);
  }
}
