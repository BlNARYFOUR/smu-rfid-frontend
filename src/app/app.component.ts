import {ChangeDetectorRef, AfterContentChecked, Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {AppService} from "./services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
    title = 'rfid-frontend';

    constructor(
        private _changeDetector: ChangeDetectorRef,
        private _authService: AuthService,
        private _router: Router) {
        let token = localStorage.getItem('ACCESS_TOKEN');

        AuthService.token = token;
        if(token != null) {

        } else {
            _router.navigateByUrl('/login');
        }
    }

    ngAfterContentChecked(): void {
        this._changeDetector.detectChanges();
    }
}