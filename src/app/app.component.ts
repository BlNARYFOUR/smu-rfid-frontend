import {ChangeDetectorRef, AfterContentChecked, Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
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
        ) {}

    ngAfterContentChecked(): void {
        this._changeDetector.detectChanges();
    }
}
