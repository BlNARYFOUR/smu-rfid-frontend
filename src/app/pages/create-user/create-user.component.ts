import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    constructor(private _appService: AppService) { }

    ngOnInit() {
        this._appService.checkTokenRedirect();
        AppService.headerTitle = 'Create User';
    }

}
