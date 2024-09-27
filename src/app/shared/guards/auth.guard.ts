import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import AuthService from '@services/auth.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  return inject(AuthService).authenticated() ? true : inject(Router).createUrlTree(['/auth/login']);
};
