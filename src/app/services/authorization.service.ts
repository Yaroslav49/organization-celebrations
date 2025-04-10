import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { jwtDecode } from 'jwt-decode';
import { Role } from "./role.model";

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    isLoggedIn: boolean;
    loginName: string = '';
    role: Role = Role.GUEST;
    photoUrl: string;
    balance: number = 0;

    constructor(private http: HttpClient) { 
        var token = localStorage.getItem('jwt');
        this.isLoggedIn = (token != null)
        if (token != null) {
            let decoded = Object(jwtDecode(token));
            console.log(decoded);
            this.loginName = decoded.sub ? decoded.sub : '';
            this.role = decoded.role ? decoded.role : '';
        }
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
                    let decoded = Object(jwtDecode(response.token));
                    console.log(decoded);
                    this.loginName = decoded.sub ? decoded.sub : '';
                    this.role = decoded.role ? decoded.role : '';
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
        this.role = Role.GUEST;
        this.isLoggedIn = false;
    }

}