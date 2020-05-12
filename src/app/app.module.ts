import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./pages/login/login.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RedirectComponent } from './pages/redirect/redirect.component';
import {TokenInterceptor} from "./services/token.interceptor";
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuditComponent } from './pages/audit/audit.component';
import {NgxPaginationModule} from "ngx-pagination";
import { UsersComponent } from './pages/users/users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { VerifyComponent } from './pages/verify/verify.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        RedirectComponent,
        NotFoundComponent,
        AuditComponent,
        UsersComponent,
        CreateUserComponent,
        VerifyComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPaginationModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
