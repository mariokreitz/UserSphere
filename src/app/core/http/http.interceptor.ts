import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const credentialsInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const modifiedRequest = req.clone({
    withCredentials: true,
  });
  return next(modifiedRequest);
};

export const csrfInterceptorFn: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (req.method === 'GET') {
    return next(req);
  }

  const csrfToken = getCsrfTokenFromCookie();

  const modifiedRequest = req.clone({
    headers: req.headers.set('X-CSRF-TOKEN', csrfToken),
  });

  return next(modifiedRequest);
};

const getCsrfTokenFromCookie = (): string => {
  const name = 'csrfToken';
  const match = document.cookie
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${name}=`));

  if (match) {
    return decodeURIComponent(match.split('=')[1]);
  }
  return '';
};
