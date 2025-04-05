import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { jwtDecode } from 'jwt-decode';

// Перехватывает http-запросы и добавляет к ним токен авторизации
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('jwt');
      if (token) {
         let decoded = Object(jwtDecode(token));
         let nowSeconds = new Date().getTime() / 1000;
         console.log(decoded.exp, nowSeconds)
         if (nowSeconds >= decoded.exp) { // сбрасываем невалидный jwt
            localStorage.removeItem('jwt');
            return next.handle(req);
         }
         const authReq = req.clone({
            setHeaders: {
               Authorization: `Bearer ${token}`
            }
         });
         return next.handle(authReq);
      } else {
         return next.handle(req);
      }
   }
}