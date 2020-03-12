import {ChangeDetectorRef, AfterContentChecked, Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
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
        private _router: Router
    ) {}

    ngAfterContentChecked(): void {
        this._changeDetector.detectChanges();
    }

    isLoginOrRedirectPage = () => {
        return (this._router.url === '/login') || (this._router.url === '/');
    };

    getLoggedInUser = () => {
        return AuthService.user;
    };

    headerTitle = () => {
        return AppService.headerTitle;
    };
}
