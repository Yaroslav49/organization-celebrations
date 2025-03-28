import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";


// Перехватывает http-запросы и добавляет к ним токен авторизации
export class JwtInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = localStorage.getItem('jwt');
        if (token) {
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