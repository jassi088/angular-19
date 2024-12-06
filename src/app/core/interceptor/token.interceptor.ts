import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LocalStorage } from '@app/core/constants/local-storage.enum';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const started = Date.now();
    let ok: 'succeeded' | 'failed' | undefined;

    // Get the token from localStorage
    const token = localStorage.getItem(LocalStorage.TOKEN);
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            ok = 'succeeded';
          }
        },
        error: (error: HttpErrorResponse) => {
          ok = 'failed';
          console.error('HTTP Request failed', error.message);
        },
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(msg);
      })
    );
  }
}
