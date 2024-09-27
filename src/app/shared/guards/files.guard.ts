import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import AuthService from '@services/auth.service';

export const FilesGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  return authService.authenticated() && (authService.isEditor() || authService.isAdmin())
    ? true
    : inject(Router).createUrlTree(['/unauthorized']);
};
