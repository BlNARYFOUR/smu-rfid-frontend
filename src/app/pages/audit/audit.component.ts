import { Component, OnInit } from '@angular/core';
import {AuditService} from "../../services/audit.service";
import {AppService} from "../../services/app.service";

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
        private _auditService: AuditService
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

            this._auditService.getAll(page, size).subscribe({
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
        window.print();
    }
}
