import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public static isRedirecting: boolean = false;

    constructor() { }

    public static setIsRedirecting(val: boolean) {
        AppService.isRedirecting = val;
    }
}
