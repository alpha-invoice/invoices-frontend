
import {RouterConfig, provideRouter} from "@angular/router";
import {InvoiceListComponent} from "./components/invoice-list.component";
import {InvoiceFormComponent} from "./components/invoice-form.component";
import {HomePageComponent} from "./components/home-page.component";
import {ContactsPageComponent} from "./components/contacts.component";
import {PageNotFoundComponent} from "./components/pagenotfound.component";
import {LoginPageComponent} from "./components/login-page.component";
import {MainPageComponent} from "./components/main-page.component";
import {LogoutComponent} from "./components/logout-page.component";
import {AuthGuard} from "./auth/auth-guard.service";

export const routes: RouterConfig = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomePageComponent },
    // {path: 'about', component: AboutPageComponent},
    { path: 'main', component: MainPageComponent, canActivate: [AuthGuard] },
    { path: 'contacts', component: ContactsPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginPageComponent },
    // {path: 'profile',component: ProfilePageComponent},
    { path: 'create/invoice', component: InvoiceFormComponent, canActivate: [AuthGuard] },
    // {path: 'settings', component: SettingsPageComponent},
    { path: 'invoices', component: InvoiceListComponent, canActivate: [AuthGuard] },
     {path: 'logout', component: LogoutComponent},
    { path: '**', component: PageNotFoundComponent }
];

export const appRouterProvider = [provideRouter(routes)];
