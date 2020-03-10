import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public static redirectUrl: string = "";

    constructor(
        private _router: Router
    ) { }

    public redirect(urlOnSuccess: string) {
        console.log("app redirect:", urlOnSuccess);
        AppService.redirectUrl = urlOnSuccess;
        this._router.navigateByUrl('/');
    }

    public checkTokenRedirect(component) {
        if(AuthService.token == null) {
            this.redirect(component._router.url);
        }
    }
}
