import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = req.clone({ withCredentials: true });

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['']);
        } else {
          console.error('HTTP Error:', error);
        }
        return throwError(() => error);
      })
    );
  }
}
