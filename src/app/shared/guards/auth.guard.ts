import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import TokenService from '../services/token.service';

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  return inject(TokenService).authenticated() ? true : inject(Router).createUrlTree(['/auth/login']);
};
