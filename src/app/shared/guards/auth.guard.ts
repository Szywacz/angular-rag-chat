import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import AuthService from '@services/auth.service';
import TokenService from '@services/token.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  return inject(AuthService).authenticated() && !inject(TokenService).isTokenExpired()
    ? true
    : inject(Router).createUrlTree(['/auth/login']);
};
