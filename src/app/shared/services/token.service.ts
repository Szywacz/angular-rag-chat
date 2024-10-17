import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import User, { Role } from '@shared/types/User';

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
  private readonly accessTokenKey = 'accessToken';
  private readonly refreshTokenKey = 'refreshToken';

  constructor(
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

  private decodeToken(token: string): TokenPayload | null {
    try {
      if (token === 'undefined') {
        throw Error('token is undefined');
      }
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload as TokenPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getAccessToken(): string | null {
    return this.getCookie(this.accessTokenKey);
  }

  setAccessToken(accessToken: string): void {
    this.setCookie(this.accessTokenKey, accessToken);
  }

  removeTokens(): void {
    this.deleteCookie(this.accessTokenKey);
    this.deleteCookie(this.refreshTokenKey);
  }

  isTokenExpired(): boolean {
    const decodedToken = this.getDecodedAccessToken();
    if (!decodedToken) return true;
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime >= expirationTime;
  }

  isTokenAboutToExpire(): boolean {
    const decodedToken = this.getDecodedAccessToken();
    if (!decodedToken) return true;
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const minutesToExpire = 5;
    return currentTime >= expirationTime - minutesToExpire * 60;
  }

  getDecodedAccessToken(): TokenPayload | null {
    return this.getAccessToken() ? this.decodeToken(this.getAccessToken()!) : null;
  }

  getUser(): User | null {
    const decodedToken = this.getDecodedAccessToken();

    if (decodedToken?.accountName && decodedToken?.role !== undefined && !this.isTokenExpired()) {
      const accountName = decodedToken.accountName;
      const role = Role[decodedToken.role as keyof typeof Role];
      const userId = decodedToken.userId;

      return { userId, accountName, role };
    }

    return null;
  }

  getUserRole(): string | null {
    return this.getDecodedAccessToken()?.role || null;
  }

  getAccountName(): string | null {
    return this.getDecodedAccessToken()?.accountName || null;
  }
}
