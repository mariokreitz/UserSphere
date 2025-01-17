import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  HttpXsrfTokenExtractor,
  provideHttpClient,
  withXsrfConfiguration,
} from '@angular/common/http';
import { routes } from './app.routes';
import { HttpInterceptorService } from './core/http/http.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CustomXsrfTokenExtractor } from './core/http/custom-xsrf-token-extractor.interceptor'; // Your custom extractor

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: 'csrfToken',
        headerName: 'X-Csrf-Token',
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    {
      provide: HttpXsrfTokenExtractor,
      useClass: CustomXsrfTokenExtractor,
    },
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables()),
  ],
};
