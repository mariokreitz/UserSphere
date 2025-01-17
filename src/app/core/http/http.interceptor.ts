import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpXsrfTokenExtractor } from '@angular/common/http';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private csrfTokenExtractor: HttpXsrfTokenExtractor
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const csrfToken = this.csrfTokenExtractor.getToken();

    if (!csrfToken) {
      return throwError(() => new Error('CSRF Token is missing'));
    }

    const clonedRequest = req.clone({
      setHeaders: {
        'X-Csrf-Token': csrfToken,
      },
      withCredentials: true,
    });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          this.router.navigate(['/error']);
        } else {
          console.error('HTTP Error:', error);
        }
        return throwError(() => error);
      })
    );
  }
}
