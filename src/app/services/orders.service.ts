import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../client/model/order.model";
import { catchError, map, Observable, of } from "rxjs";
import { PublicOrdersPage } from "../master/public-orders/model/public-orders-page.model";

@Injectable({ providedIn: 'root' })
export class OrdersService {
   constructor(private http: HttpClient) { }

   getMyOrdersClient(): Observable<Order[]> {
      return this.http.get("http://localhost:8080/clients/my-orders").pipe(map((data: any) => data));
   }

   getMyOrdersMaster(): Observable<Order[]> {
      return this.http.get("http://localhost:8080/masters/my-orders").pipe(map((data: any) => data));
   }

   getPublicOrders(): Observable<PublicOrdersPage> {
      return this.http.get("http://localhost:8080/orders").pipe(map((data: any) => data));
   }

   // взятие заказа мастером
   assignOrder(orderId: number): Observable<string> {
      console.log(orderId);
      return this.http.patch<any>(`http://localhost:8080/orders/${orderId}/assign-order`, null)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('требуется авторизация');
               } else if (error.status == 404) {
                  return of('заказ не найден');
               } else if (error.status == 409) {
                  /*if (error.error.error == 'NotEnoughMoney') {
                     return of('у клиента недостаточно средств на счёте');
                  }*/
                  return of('исполнитель для заказа уже найден');
               }
               return of('Неизвестная ошибка');
            })
         );
   }

   // принятие заявки на заказ мастером
   acceptOrder(orderId: number): Observable<string> {
      console.log(orderId);
      return this.http.patch<any>(`http://localhost:8080/orders/${orderId}/accept-order`, null)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('требуется авторизация');
               } else if (error.status == 404) {
                  return of('заказ не найден');
               } else if (error.status == 409) {
                  return of('исполнитель для заказа уже найден');
               }
               return of('Неизвестная ошибка');
            })
         );
   }

   // отклонение заявки на заказ мастером
   declineOrder(orderId: number): Observable<string> {
      console.log(orderId);
      return this.http.patch<any>(`http://localhost:8080/orders/${orderId}/decline-order`, null)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('требуется авторизация');
               } else if (error.status == 404) {
                  return of('заказ не найден');
               } else if (error.status == 409) {
                  return of('исполнитель для заказа уже найден');
               }
               return of('Неизвестная ошибка');
            })
         );
   }

   // закрытие заказа клиентом
   closeOrder(orderId: number): Observable<string> {
      console.log(orderId);
      return this.http.patch<any>(`http://localhost:8080/orders/${orderId}/close-order`, null)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('Требуется авторизация');
               } else if (error.status == 404) {
                  return of('Заказ не найден');
               }
               return of('Неизвестная ошибка');
            })
         );
   }

   // отмена заказа клиентом
   cancelOrder(orderId: number): Observable<string> {
      console.log(orderId);
      return this.http.delete<any>(`http://localhost:8080/orders/${orderId}/cancel-order`)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('Требуется авторизация');
               } else if (error.status == 404) {
                  return of('Заказ не найден');
               } else if (error.status == 409) {
                  return of('Не удалось отменить заказ');
               }
               return of('Неизвестная ошибка');
            })
         );
   }

   // создание заказа
   createOrder(order: Order): Observable<string> {
      console.log(order);
      return this.http.post<any>('http://localhost:8080/orders/create-order', order)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('Ошибка: требуется авторизация');
               } else if (error.status == 404) {
                  return of('Ошибка: данные заказа некорректны');
               } else if (error.status == 409) {
                  if (error.error.error == 'NotEnoughMoney') {
                     return of('Ошибка: недостаточно средств на счёте');
                  }
                  return of('Ошибка: такой заказ уже существует');
               }
               return of('Неизвестная ошибка. Проверьте правильность заполнения заказа');
            })
         );
   }

   // предложение заказа мастеру
   offerOrder(order: Order, masterId: number): Observable<string> {
      console.log(order);
      return this.http.post<any>(`http://localhost:8080/orders/${masterId}/offer-order`, order)
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('Ошибка: требуется авторизация');
               } else if (error.status == 404) {
                  return of('Ошибка: данные заказа некорректны');
               } else if (error.status == 409) {
                  if (error.error.error == 'NotEnoughMoney') {
                     return of('Ошибка: недостаточно средств на счёте');
                  }
                  return of('Ошибка: такой заказ уже существует');
               }
               return of('Неизвестная ошибка. Проверьте правильность заполнения заказа');
            })
         );
   }
}