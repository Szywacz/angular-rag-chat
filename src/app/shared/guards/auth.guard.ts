import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import AuthService from '@services/auth.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService)
  return authService.authenticated() ? true : inject(Router).createUrlTree(['/auth/login']);
};
