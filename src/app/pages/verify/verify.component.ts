import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

    verifyMessage: string = "";
    verifyError: string = "";
    verified: boolean = false;

    constructor(
        private _authService: AuthService,
        private _route: ActivatedRoute
    ) {
        this._route.queryParams.subscribe(params => {
            this.verifySubmit(params['token']);
        });
    }

    ngOnInit() {
    }

    verifySubmit(token) {
        this._authService.verify(token).subscribe({
            next: (data: any) => {
                this.verifyError = null;
                this.verifyMessage = data.message;
                this.verified = true;
                console.log(data);
            },
            error: (data: any) => {
                console.log(data.error);
                this.verifyMessage = null;
                this.verified = true;
                if(data.error) {
                    this.verifyError = data.error.error ? data.error.error : 'Verification failed. Try again later.';
                }
            }
        });
    }

}
