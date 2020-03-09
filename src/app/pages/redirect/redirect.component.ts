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
        console.log("PAGE: REDIRECT");

        let token = localStorage.getItem('ACCESS_TOKEN');
        AuthService.token = token;

        if(token != null) {
            this.checkLoginStatus();
        } else {
            this._router.navigateByUrl('/login');
        }
    }

    checkLoginStatus = () => {
        this._authService.getLoggedIn().subscribe({
            next: (data: any) => {
                console.log(data);
                window.scrollTo(0,0);

                if(this._router.url === "/") {
                    this._router.navigateByUrl('dashboard');
                } else {
                    this._router.navigateByUrl(AppService.redirectUrl);
                }
            },
            error: (data: any) => {
                localStorage.removeItem('ACCESS_TOKEN');
                console.log("LOGIN CHECK:", data.error);
                console.log("UNAUTHENTICATED: REDIRECTING...");
                window.scrollTo(0,0);
                this._router.navigateByUrl('/login');
            }
        });
    };
}
