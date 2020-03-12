import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuditService {
    private getUrl: string = environment.apiUrl + 'audits';

    constructor(private _http: HttpClient) { }

    public getAll() {
        return this._http.get(this.getUrl + '?size=25');
    }
}
