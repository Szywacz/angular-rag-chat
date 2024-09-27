import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import User from '@shared/types/User';
import { Observable, tap } from 'rxjs';
import TokenService from './token.service';

export interface AuthPayload {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  private readonly authApiUrl = '/api/auth';
  currentUserSignal: WritableSignal<User | undefined | null> = signal<User | undefined | null>(undefined);
  isLoadingSignal: WritableSignal<boolean> = signal<boolean>(true);

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
    return !this.tokenService.isTokenExpired() && !!this.tokenService.getAccessToken() && !!this.currentUserSignal();
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
        this.tokenService.setTokens(response.accessToken, response.refreshToken);
      }),
    );
  }

  setCredentials(response: AuthPayload) {
    this.tokenService.setTokens(response.accessToken, response.refreshToken);
    const user = this.tokenService.getUser();
    this.currentUserSignal.set(user);
  }
}
