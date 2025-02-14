import {HttpInterceptorFn} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {inject} from '@angular/core';
import {TokenService} from './token.service';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const {token, tokenValid} = inject(TokenService);

  if (token && tokenValid) {
    const Authorization = `Bearer ${token}`;
    const authReq = req.clone({setHeaders: {Authorization}});
    return next(authReq);
  }
  return next(req);
};
