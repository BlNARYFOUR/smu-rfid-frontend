import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Observable, throwError} from "rxjs/index";
import {catchError, tap} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private _router: Router
    ) {}

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
                    if(event.headers.has("Authorization")) {
                        AuthService.token = event.headers.get("Authorization").split(' ')[1];
                        localStorage.setItem('ACCESS_TOKEN', AuthService.token);
                    }
                }
            }),
            catchError((error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 || error.status === 0) {
                        localStorage.removeItem('ACCESS_TOKEN');
                        AuthService.token = null;
                        AuthService.user = null;
                        if(!request.headers.get('Disable-Redirect')) {
                            this._router.navigateByUrl('/login');
                        }
                    }
                }

                return throwError(error);
            })
        );
    }
}