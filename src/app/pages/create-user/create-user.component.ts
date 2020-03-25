import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

    newUserForm: FormGroup;
    newUserError: string;
    newUserMessage: string;

    constructor(
        private _formBuilder: FormBuilder,
        private _appService: AppService,
        private _authService: AuthService
    ) {
        this.createForms();
    }

    ngOnInit() {
        this._appService.checkTokenRedirect();
        AppService.headerTitle = 'Create User';
    }

    createForms() {
        this.newUserForm = this._formBuilder.group({
            first_name: ['', Validators.required],
            middle_name: [''],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            admin: ['']
        }, {validator: this.checkPasswords });
    }

    checkPasswords = (group: FormGroup) => {
        let pass = group.get('password').value;
        let confirmPass = group.get('confirmPassword').value;

        return pass === confirmPass ? null : { invalidConfirm: true }
    };

    submitNewUser() {
        this.newUserForm.markAsPending();

        let data = this.newUserForm.value;
        data['admin'] = document.querySelector('#admin')['checked'];

        this._authService.register(data).subscribe({
            next: (data: any) => {
                this.newUserForm.reset();
                this.newUserError = null;
                this.newUserMessage = data.message;
                console.log(data);
            },
            error: (data: any) => {
                this.newUserForm.reset();
                console.log(data.error.error);

                this.newUserMessage = null;

                if(data.error) {
                    this.newUserError = data.error.error ? data.error.error : 'Register failed. Try again later.';
                }
            }
        });
    }
}
