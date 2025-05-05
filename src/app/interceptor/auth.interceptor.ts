import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Token aus Cookies holen
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('accessToken='));
  const token = match ? match.split('=')[1] : null;

  // Request klonen und Header + withCredentials setzen
  const authReq = req.clone({
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    // nur nötig bei Cross-Site-Requests, um Cookies zu senden
    withCredentials: true,
  });

  return next(authReq);
};
