import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private getUrl: string = environment.apiUrl + 'users';

    constructor(private _http: HttpClient) { }

    public getAll(page: number, size: number, search: string = null) {
        return this._http.get(this.getUrl + '?size=' + size + '&page=' + page + ( search == null ? '' : '&search=' + search));
    }
}
