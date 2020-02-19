import { Component } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'rfid-frontend';
    isRedirecting: boolean = true;

    constructor(
        private _authService: AuthService,
        private _router: Router) {
        let token = localStorage.getItem('ACCESS_TOKEN');

        AuthService.token = token;
        if(token != null) {
            //this.getLoggedInUser();
        } else {
            //AuthService.setLoggedIn(false);
            _router.navigateByUrl('/login');
            this.isRedirecting = false;
        }
    }
}
