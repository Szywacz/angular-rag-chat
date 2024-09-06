import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import TokenService from '../services/token.service';

export const LoggedInGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.authenticated()) {
    return router.createUrlTree(['/']);
  }

  return true;
};
