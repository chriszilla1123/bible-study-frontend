import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {LoginService} from '../service/login/login.service';
import {inject} from '@angular/core';
import {Observable} from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  // const loginService: LoginService = inject(LoginService);
  // const credentials = loginService.getStoredCredentials();
  // if (credentials) {
  //   const authHeader = 'Basic ' + btoa(credentials.username + ':' + credentials.password);
  //   req = req.clone({setHeaders: {Authorization: authHeader}});
  // }
  return next(req);
};
