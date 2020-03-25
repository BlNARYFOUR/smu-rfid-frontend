import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loginUrl: string = environment.apiUrl + 'auth/login';
    private registerUrl: string = environment.apiUrl + 'auth/register';
    private verifyUrl: string = environment.apiUrl + 'auth/verify';
    private logoutUrl: string = environment.apiUrl + 'auth/logout';
    private getLoggedInUrl: string = environment.apiUrl + 'auth/logged-in';

    public static token = null;
    public static user = null;

    constructor(private _http: HttpClient) { }

    public login(userInfo: any) {
        return this._http.post(this.loginUrl, userInfo);
    }

    public logout() {
        return this._http.post(this.logoutUrl, {});
    }

    public getLoggedIn(disableRedirect = false) {
        if(disableRedirect) {
            return this._http.get(this.getLoggedInUrl, {
                headers: {'Disable-Redirect': 'true'}
            });
        } else {
            return this._http.get(this.getLoggedInUrl);
        }
    }

    public register(userInfo: any) {
        return this._http.post(this.registerUrl, userInfo);
    }
}
