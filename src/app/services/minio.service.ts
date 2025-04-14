import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class MinioService {
    constructor(private http: HttpClient) { }

    getImage(uuid: string): Observable<String> {
        return this.http.get<string>(`http://localhost:8080/images/get/${uuid}`, { responseType: 'text' as 'json' }).pipe(
            map((data: any) => data),
            catchError(error => {  
                console.log(error); 
                return String(error.text);
            })
        );
    }
}