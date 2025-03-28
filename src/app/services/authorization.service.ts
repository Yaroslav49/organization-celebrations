import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    isLoggedIn: boolean = false;

    constructor(private http: HttpClient) { }

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

    isAuthenticated(): boolean {
        return localStorage.getItem('jwt') != null;
    }
}