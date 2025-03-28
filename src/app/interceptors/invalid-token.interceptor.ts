import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { AlertsStore } from '../stores/alerts.store';

export const invalidTokenInterceptor: HttpInterceptorFn = (
  req,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const alertsStore = inject(AlertsStore);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        alertsStore.addAlert({
          message: 'Votre session a expiré.',
          type: 'error',
        });
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
