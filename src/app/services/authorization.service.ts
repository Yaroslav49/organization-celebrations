import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    isLoggedIn: boolean;
    photoUrl: string;

    constructor(private http: HttpClient) { 
        this.isLoggedIn = (localStorage.getItem('jwt') != null)
        this.photoUrl = "@tui.user";
    }
 
    isAuthenticated(): boolean {
        return this.isLoggedIn;
    }

    login(login: string, password: string): Observable<boolean> {
        var body = { login: login, password: password };
        console.log("login start");
        return this.http.post<any>('http://localhost:8080/auth/login', body)
            .pipe(
                map(response => {
                    localStorage.setItem('jwt', response.token);
                    this.isLoggedIn = true;
                    return true;
                }),
                catchError(error => {
                    this.isLoggedIn = false;
                    console.info(error.error.error);
                    return of(false);
                })
            );
    }

    logout(): void {
        localStorage.removeItem('jwt');
        this.isLoggedIn = false;
    }

}