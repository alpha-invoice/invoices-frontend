
import {RouterConfig, provideRouter} from "@angular/router";
import {InvoiceListComponent} from "./components/invoice-list.component";
import {InvoiceFormComponent} from "./components/invoice-form.component";
import {HomePageComponent} from "./components/home-page.component";
import {PageNotFoundComponent} from "./components/pagenotfound.component";

export const routes: RouterConfig = [
  // {path: '', component:  HomePageComponent},
  // {path: 'home', component:  HomePageComponent},
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  {path: 'home', component:  HomePageComponent},
  // {path: 'about', component: AboutPageComponent},
  // {path: 'contacts', component: ContactsPageComponent},
  // {path: 'features', component: FeaturesPageComponent},
  // {path: 'login', component: LoginPageComponent},
  // {path: 'profile',component: ProfilePageComponent},
  {path: 'create/invoice', component: InvoiceFormComponent},
  // {path: 'settings', component: SettingsPageComponent},
  {path: 'invoices', component: InvoiceListComponent},
  {path: 'invoices', component: InvoiceListComponent},
  // {path: 'logout', component: LogoutComponent}
  {path: '**', component: PageNotFoundComponent}
];

export const appRouterProvider = [provideRouter(routes)];
