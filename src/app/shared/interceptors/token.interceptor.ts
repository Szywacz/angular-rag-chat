import { isPlatformBrowser } from '@angular/common';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import AuthService, { AuthPayload } from '@services/auth.service';
import TokenService from '@services/token.service';
import { catchError, switchMap, take, tap, throwError, timeout } from 'rxjs';

let isRefreshing = false; // Global flag to track if refresh is in progress

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) return next(req);
  const token = tokenService.getAccessToken();

  if (token && tokenService.isTokenAboutToExpire()) {
    if (!isRefreshing) {
      isRefreshing = true;

      return authService.refresh().pipe(
        take(1),
        switchMap((response: AuthPayload) => {
          tokenService.setAccessToken(response.accessToken);
          const authReq = addAuthHeader(req, response.accessToken);
          isRefreshing = false;
          return next(authReq);
        }),
        catchError(() => {
          isRefreshing = false;
          return authService.logout().pipe(
            timeout(5000),
            tap(() => {
              router.navigate(['/auth/login'], { queryParams: { returnUrl: router.url } });
            }),
            switchMap(() => throwError(() => new Error('Session expired. Please log in again.'))),
          );
        }),
      );
    }
  }

  const authReq = addAuthHeader(req, token || '');
  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        return authService.logout().pipe(
          timeout(5000),
          tap(() => {
            router.navigate(['/auth/login'], { queryParams: { returnUrl: router.url } });
          }),
          switchMap(() =>
            throwError(() => {
              router.navigate(['/auth/login'], { queryParams: { returnUrl: router.url } });
              new Error('Session expired. Please log in again.');
            }),
          ),
        );
      }
      return throwError(() => error);
    }),
  );
}

function addAuthHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
