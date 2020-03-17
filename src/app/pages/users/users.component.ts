import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {AuditService} from "../../services/audit.service";
import {Title} from "@angular/platform-browser";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    userList: any;
    errorMessage: string;

    pageSize: number = 25;
    currentPage: number = 1;
    totalItems: number = 0;
    pageUpdateBusy: boolean = false;

    constructor(
        private _appService: AppService,
        private _userService: UserService,
        private _titleService: Title
    ) { }

    ngOnInit() {
        if(this._appService.checkTokenRedirect()) {
            this.getUsers(this.currentPage, this.getPageSize());
        }

        AppService.headerTitle = 'Users';
    }

    getUsers = (page, size) => {
        if(!this.pageUpdateBusy) {
            this.pageUpdateBusy = true;

            this._userService.getAll(page, size, document.querySelector('.search-input')['value']).subscribe({
                next: (data: any) => {
                    console.log(data);
                    if(document.querySelector('#scrollList')) {
                        document.querySelector('#scrollList').scrollTo(0, 0);
                    }
                    this.userList = data.data;
                    this.totalItems = data.meta.total;
                    this.pageUpdateBusy = false;
                },
                error: (data: any) => {
                    if(data.error) {
                        this.errorMessage = data.error.error ? data.error.error : 'Couldn\'t get users. Try again later.';
                    }
                    this.pageUpdateBusy = false;
                }
            });
        } else {
            console.log("OOPS! You going too faaasssttt");
        }
    };

    getPageSize = () => {
        return this.pageSize;
    };

    pageChanged = ($page) => {
        this.currentPage = $page;
        this.getUsers($page, this.getPageSize());
        console.log("CHANGED: pageChanged");
    };

    printPage = () => {
        let buf = this._titleService.getTitle();
        this._titleService.setTitle('SMU_RFID_Users_' + new Date().getTime());
        window.print();
        this._titleService.setTitle(buf);
    };

    onSearchChange = () => {
        this.currentPage = 1;
        this.getUsers(this.currentPage, this.pageSize);
    };
}
