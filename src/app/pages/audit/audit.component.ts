import { Component, OnInit } from '@angular/core';
import {AuditService} from "../../services/audit.service";
import {AppService} from "../../services/app.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-audit',
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

    auditList: any;
    errorMessage: string;

    pageSize: number = 25;
    currentPage: number = 1;
    totalItems: number = 0;
    pageUpdateBusy: boolean = false;

    constructor(
        private _appService: AppService,
        private _auditService: AuditService,
        private _titleService: Title
    ) { }

    ngOnInit() {
        if(this._appService.checkTokenRedirect()) {
            this.getAudits(this.currentPage, this.getPageSize());
        }

        AppService.headerTitle = 'Audit';
    }

    getAudits = (page, size) => {
        if(!this.pageUpdateBusy) {
            this.pageUpdateBusy = true;

            this._auditService.getAll(page, size, document.querySelector('.search-input')['value']).subscribe({
                next: (data: any) => {
                    if(document.querySelector('#scrollList')) {
                        document.querySelector('#scrollList').scrollTo(0, 0);
                    }
                    this.auditList = data.data;
                    this.totalItems = data.meta.total;
                    this.pageUpdateBusy = false;
                },
                error: (data: any) => {
                    if(data.error) {
                        this.errorMessage = data.error.error ? data.error.error : 'Couldn\'t get audit data. Try again later.';
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
        this.getAudits($page, this.getPageSize());
        console.log("CHANGED: pageChanged");
    };

    printPage = () => {
        let buf = this._titleService.getTitle();
        this._titleService.setTitle('SMU_RFID_Audit_' + new Date().getTime());
        window.print();
        this._titleService.setTitle(buf);
    };

    onSearchChange = () => {
        this.currentPage = 1;
        this.getAudits(this.currentPage, this.pageSize);
    };
}
