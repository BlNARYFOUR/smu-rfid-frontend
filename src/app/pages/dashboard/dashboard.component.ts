import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    logoutClicked: boolean = false;

    constructor(
        private _appService: AppService,
        private _authService: AuthService,
        private _router: Router
    ) { }

    ngOnInit() {
        this._appService.checkTokenRedirect();
        AppService.headerTitle = 'Dashboard';
    }

    isAdmin = () => {
        return AuthService.user ? AuthService.user.admin : false;
    };

  logout = () => {
      if(!this.logoutClicked) {
          this.logoutClicked = true;

          document.querySelector('#logout-btn').classList.add('disabled');

          this._authService.logout().subscribe({
              next: (data: any) => {
                  localStorage.removeItem('ACCESS_TOKEN');
                  this._router.navigateByUrl('/login');
              },
              error: (data: any) => {
                  console.log("LOGOUT:", data.error.error);
              }
          });
      } else {
          console.log("OOPS! You going too faaasssttt");
      }
  };
}
