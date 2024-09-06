import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class TokenService {
  private token: string | null = 'mock_token';

  authenticated(): boolean {
    return true;
  }

  getToken(): string | null {
    return this.token;
  }

  setToken(token: string): void {
    this.token = token;
  }

  clearToken(): void {
    this.token = null;
  }
}
