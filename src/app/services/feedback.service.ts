import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map, catchError, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class FeedBackService {
   constructor(private http: HttpClient) { }

   rateMaster(orderId: number, evaluation: number, description: string): Observable<string> {
      console.log(orderId);
      return this.http.post<any>(`http://localhost:8080/feedback/${orderId}`, 
         {evaluation: evaluation, description: description})
         .pipe(
            map(() => {
               return 'ok';
            }),
            catchError(error => {
               if (error.status == 403) {
                  return of('требуется авторизация');
               } else if (error.status == 404) {
                  return of('данные некорректны или заказ не найден');
               } else if (error.status == 409) {
                  return of('дублирование отзыва');
               }
               return of('Неизвестная ошибка');
            })
         );
   }

}