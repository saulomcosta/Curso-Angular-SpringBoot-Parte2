import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const tokenstring = localStorage.getItem( 'access_token' );

    const url = request.url;

    if ( tokenstring && !url.endsWith('/oauth/token')) {
      const token = JSON.parse(tokenstring);
      const jwt = token.access_token;

      request = request.clone( {
        
        setHeaders : {
          Authorization: 'Bearer ' + jwt
        }

      })
    }

    return next.handle(request);
  }
}
