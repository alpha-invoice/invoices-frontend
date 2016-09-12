
import {RouterConfig, provideRouter} from "@angular/router";
import {InvoiceListComponent} from "./components/invoice-list.component";
import {InvoiceFormComponent} from "./components/invoice-form.component";
import {HomePageComponent} from "./components/home-page.component";
import {PageNotFoundComponent} from "./components/pagenotfound.component";
import {LoginPageComponent} from "./components/login-page.component";
import {MainPageComponent} from "./components/main-page.component";

export const routes: RouterConfig = [
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  {path: 'home', component:  HomePageComponent},
  // {path: 'about', component: AboutPageComponent},
  // {path: 'contacts', component: ContactsPageComponent},
  {path: 'main', component: MainPageComponent},
   {path: 'login', component: LoginPageComponent},
  // {path: 'profile',component: ProfilePageComponent},
      {path: 'create/invoice', component: InvoiceFormComponent},
  // {path: 'settings', component: SettingsPageComponent},
      {path: 'invoices', component: InvoiceListComponent},
  // {path: 'logout', component: LogoutComponent}
      {path: '**', component: PageNotFoundComponent}
];

export const appRouterProvider = [provideRouter(routes)];
