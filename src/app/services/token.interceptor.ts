import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Observable, of} from "rxjs/index";
import {catchError, tap} from "rxjs/internal/operators";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public _authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(!request.headers.has("Authorization")) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${AuthService.token}`
                }
            });
        }

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    console.log("HEADERS:", event.headers);
                    console.log(event.body);
                    if(event.headers.has("Authorization")) {
                        console.log("INTERCEPT AUTH HEADER");
                        let token = event.headers.get("Authorization").split(' ')[1];
                        AuthService.token = token;
                        localStorage.setItem('ACCESS_TOKEN', token);
                    }
                }
            }),
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    console.log("INTERCEPT HTTP ERROR:", error.status);
                    if (error.status === 401) {
                        console.log("INTERCEPT HTTP AUTH ERROR");
                    }
                }

                return next.handle(error);
            })
        );
    }
}