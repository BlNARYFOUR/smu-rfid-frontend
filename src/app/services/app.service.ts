import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public static redirectUrl: string = "/dashboard";

    constructor(
        private _router: Router
    ) { }

    public redirect(urlOnSuccess: string) {
        AppService.redirectUrl = urlOnSuccess;
        this._router.navigateByUrl('/');
    }

    public checkTokenRedirect() {
        if(AuthService.token == null) {
            this.redirect(this._router.url);
            return false;
        }

        return true;
    }
}
