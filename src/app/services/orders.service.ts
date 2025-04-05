import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../client/model/order.model";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrdersService {
   constructor(private http: HttpClient) { }

   createOrder(order: Order): Observable<boolean> {
      console.log(order);
      return this.http.post<any>('http://localhost:8080/orders/create-order', order)
         .pipe(
            map(() => {
               console.log('creating order success');
               return true;
            }),
            catchError(error => {
               console.log('creating order failed');
               console.info(error.error.error);
               return of(false);
            })
         );
   }
}