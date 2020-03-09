import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      private _appService: AppService,
      private _router: Router
  ) { }

  ngOnInit() {
      console.log("PAGE: DASHBOARD");
      this._appService.checkTokenRedirect(this);
  }

}
