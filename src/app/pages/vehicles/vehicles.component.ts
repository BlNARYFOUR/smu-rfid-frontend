import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  constructor(
      private _appService: AppService,
      private _titleService: Title
  ) { }

  ngOnInit() {
      if(this._appService.checkTokenRedirect()) {
          // this.getUsers(this.currentPage, this.getPageSize());
      }

      AppService.headerTitle = 'Vehicles';
  }

}
