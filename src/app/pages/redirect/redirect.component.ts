import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {
    constructor(
        private _authService: AuthService,
        private _router: Router) {}

    ngOnInit(): void {
        AuthService.token = localStorage.getItem('ACCESS_TOKEN');

        if(AuthService.token != null) {
            this.checkLoginStatus();
        } else {
            this._router.navigateByUrl('/login');
        }
    }

    checkLoginStatus = () => {
        this._authService.getLoggedIn().subscribe({
            next: (data: any) => {
                AuthService.user = data.data;
                window.scrollTo(0,0);

                if(this._router.url === "/") {
                    this._router.navigateByUrl('/dashboard');
                } else {
                    this._router.navigateByUrl(AppService.redirectUrl);
                }
            },
            error: (data: any) => {
                console.log("UNAUTHENTICATED: REDIRECTING...");
            }
        });
    };
}
