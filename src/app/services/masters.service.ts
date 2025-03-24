import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Master } from "../client/masters/model/master.model";
import { MastersPage } from "../client/masters/model/masters-page.model";

@Injectable({providedIn: 'root'})
export class MastersService {
  constructor(private http: HttpClient) { }

  getMastersPage(category: string) : Observable<MastersPage> {
    const params = new HttpParams().set("category", category);
    return this.http.get("http://localhost:8080/masters", {params}).pipe(map((data:any) => data));
  }
}