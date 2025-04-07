import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../client/model/order.model";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrdersService {
   constructor(private http: HttpClient) { }

   createOrder(order: Order): Observable<string> {
      console.log(order);
      return this.http.post<any>('http://localhost:8080/orders/create-order', order)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('Ошибка: требуется авторизация')
               } else if (error.status == 404) {
                  return of('Ошибка: данные заказа некорректны')
               } else if (error.status == 409) {
                  return of('Ошибка: такой заказ уже существует')
               }
               return of('Неизвестная ошибка. Проверьте правильность заполнения заказа');
            })
         );
   }

   getMyOrdersClient(): Observable<Order[]> {
      return this.http.get("http://localhost:8080/clients/my-orders").pipe(map((data: any) => data));
   }
}