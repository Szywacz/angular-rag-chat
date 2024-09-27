import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import User, { Role } from '@shared/types/User';
import { AuthPayload } from './auth.service';

export interface TokenPayload {
  sub: string;
  role: string;
  accountName: string;
  userId: string;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export default class TokenService {
  private readonly authApiUrl = '/auth';

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private decodedToken: TokenPayload | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}

  private getCookie(name: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const cookies = document.cookie.split(';');
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
    }
    return null;
  }

  private setCookie(name: string, value: string, expirationDays: number = 7): void {
    if (isPlatformBrowser(this.platformId)) {
      const date = new Date();
      date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Strict;Secure`;
    }
  }

  private deleteCookie(name: string): void {
    if (isPlatformBrowser(this.platformId)) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict;Secure`;
    }
  }

  getAccessToken(): string | null {
    return this.getCookie(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return this.getCookie(this.refreshTokenKey);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    this.setCookie(this.accessTokenKey, accessToken);
    this.setCookie(this.refreshTokenKey, refreshToken);
  }

  removeTokens(): void {
    this.deleteCookie(this.accessTokenKey);
    this.deleteCookie(this.refreshTokenKey);
  }

  refreshToken(): Observable<AuthPayload> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthPayload>(`${this.authApiUrl}/refresh-token`, { refreshToken: refreshToken }).pipe(
      tap((response) => {
        this.setTokens(response.accessToken, response.refreshToken);
      }),
    );
  }

  private decodeToken(token: string): void {
    try {
      if (token === 'undefined') {
        this.decodedToken = null;
        throw Error('token is undefined');
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.decodedToken = payload as TokenPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      this.decodedToken = null;
    }
  }

  isTokenExpired(): boolean {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) return true;
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= expirationTime;
  }

  getDecodedToken(): TokenPayload | null {
    if (!this.decodedToken && this.getAccessToken()) {
      this.decodeToken(this.getAccessToken()!);
    }
    return this.decodedToken;
  }

  getUser(): User | null {
    const decodedToken = this.getDecodedToken();

    if (decodedToken?.accountName && decodedToken?.role !== undefined && !this.isTokenExpired()) {
      const accountName: string = decodedToken.accountName;
      const role: Role = Role[decodedToken.role as keyof typeof Role];

      return { accountName, role };
    }

    return null;
  }

  getUserRole(): string | null {
    return this.getDecodedToken()?.role || null;
  }

  getAccountName(): string | null {
    return this.getDecodedToken()?.accountName || null;
  }
}
