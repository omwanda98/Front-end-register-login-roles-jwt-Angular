import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const currentUser = this.authService.currentUserValue;
    const token = currentUser ? currentUser.jwt : null;

    if (token) {
      // Clone the request and replace the original headers with cloned headers, updated with the authorization.
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });

      // Send cloned request with header to the next handler.
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
