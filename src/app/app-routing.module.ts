import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {RedirectComponent} from "./pages/redirect/redirect.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {AuditComponent} from "./pages/audit/audit.component";

const routes: Routes = [
    { path: '', component: RedirectComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dashboard/audit', component: AuditComponent },
    { path: '**', component: NotFoundComponent  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled',onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
