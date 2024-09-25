import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import TokenService from '../services/token.service';

export const FilesGuard: CanActivateFn = (): boolean | UrlTree => {
  const tokenService = inject(TokenService);
  return tokenService.authenticated() && (tokenService.isEditor() || tokenService.isAdmin())
    ? true
    : inject(Router).createUrlTree(['/unauthorized']);
};
