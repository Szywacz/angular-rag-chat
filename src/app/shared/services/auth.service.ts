import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import User from '@shared/types/User';
import { catchError, Observable, of, tap } from 'rxjs';
import TokenService from './token.service';

export interface AuthPayload {
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private readonly authApiUrl = '/api/auth';
  currentUserSignal: WritableSignal<User | undefined | null> = signal<User | undefined | null>(undefined);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage() {
    const storedUser = this.tokenService.getUser();
    if (storedUser) {
      this.currentUserSignal.set(storedUser);
    } else {
      this.currentUserSignal.set(null);
    }
  }

  authenticated(): boolean {
    return !!this.tokenService.getAccessToken() && !!this.currentUserSignal();
  }

  isEditor(): boolean {
    const role = this.tokenService.getUserRole();
    return role === 'editor' || role === 'admin';
  }

  isAdmin(): boolean {
    return this.tokenService.getUserRole() === 'admin';
  }

  login(accountName: string, password: string): Observable<AuthPayload> {
    return this.http.post<AuthPayload>(`${this.authApiUrl}/login`, { accountName, password });
  }

  register(accountName: string, password: string): Observable<AuthPayload> {
    return this.http.post<AuthPayload>(`${this.authApiUrl}/register`, { accountName, password }).pipe(
      tap((response) => {
        this.tokenService.setAccessToken(response.accessToken);
      }),
    );
  }

  refresh(): Observable<AuthPayload> {
    return this.http.post<AuthPayload>(`${this.authApiUrl}/refresh`, null);
  }

  logout(): Observable<{ message: string }> {
    this.clearAccess();

    return this.http.post<{ message: string }>(`${this.authApiUrl}/logout`, null).pipe(
      catchError((error) => {
        console.error('Logout request failed:', error);
        return of({ message: 'Logged out locally' });
      }),
    );
  }

  setCredentials(response: AuthPayload) {
    this.tokenService.setAccessToken(response.accessToken);
    const user = this.tokenService.getUser();
    this.currentUserSignal.set(user);
  }

  clearAccess() {
    this.tokenService.removeTokens();
    this.currentUserSignal.set(null);
  }
}
