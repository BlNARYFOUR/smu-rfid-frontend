import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
      private _appService: AppService
  ) { }

  ngOnInit() {
      this._appService.checkTokenRedirect();
  }

}
