import { HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomXsrfTokenExtractor implements HttpXsrfTokenExtractor {
  getToken() {
    const csrfToken = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('csrfToken='));

    return csrfToken ? csrfToken.split('=')[1] : null;
  }
}
