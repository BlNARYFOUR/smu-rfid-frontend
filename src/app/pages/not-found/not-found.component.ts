import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

    constructor(
        private _authService: AuthService
    ) { }

    ngOnInit() {
        AuthService.token = localStorage.getItem('ACCESS_TOKEN');

        if(AuthService.token  != null) {
            this.checkLoginStatus();
        }

        AppService.headerTitle = 'Error 404';
    }

    getLoggedInUser = () => {
        return AuthService.user;
    };

    checkLoginStatus = () => {
        this._authService.getLoggedIn(true).subscribe({
            next: (data: any) => {
                AppService.redirectUrl = '/dashboard';
                AuthService.user = data.data;
            },
            error: (data: any) => {
                console.log("UNAUTHENTICATED");
            }
        });
    };
}
