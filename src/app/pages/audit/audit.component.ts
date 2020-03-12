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

    constructor(
        private _appService: AppService,
        private _auditService: AuditService
    ) { }

    ngOnInit() {
        if(this._appService.checkTokenRedirect()) {
            this.getAudits();
        }
    }

    getAudits = () => {
        this._auditService.getAll().subscribe({
            next: (data: any) => {
                console.log(data.data);
                this.auditList = data.data;
            },
            error: (data: any) => {
                if(data.error) {
                    this.errorMessage = data.error.error ? data.error.error : 'Couldn\'t get audit data. Try again later.';
                }
            }
        });
    }
}
