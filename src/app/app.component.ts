import {ChangeDetectorRef, AfterContentChecked, Component} from '@angular/core';
import {Router} from "@angular/router";

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
    }
}
