import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
    selector: 'app-index',
    providers: [AuthService],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loginError: string;
    loginMessage: string;

    constructor(
        private _appService: AppService,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private _router: Router) {
        this.createForms();
    }

    ngOnInit() {
        console.log("PAGE: LOGIN");

        let token = localStorage.getItem('ACCESS_TOKEN');
        AuthService.token = token;

        if(token != null) {
            this._appService.redirect("/dashboard");
        }
    }

    createForms() {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    loginSubmit() {
        this.loginForm.markAsPending();

        this._authService.login(this.loginForm.value).subscribe({
            next: (data: any) => {
                this.loginForm.reset();
                this.loginMessage = 'You have been logged in!';
                console.log(data);
                AuthService.token = data.access_token;
                localStorage.setItem('ACCESS_TOKEN', data.access_token);
                window.scrollTo(0,0);
                this._router.navigateByUrl('/dashboard');
            },
            error: (data: any) => {
                this.loginForm.reset();
                console.log(data.error.error);

                if(data.error) {
                    this.loginError = data.error.error ? data.error.error : 'Login failed. Try again later.';
                }
            }
        });
    }
}
