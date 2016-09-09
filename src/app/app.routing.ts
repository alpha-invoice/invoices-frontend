
import {RouterConfig, provideRouter} from "@angular/router";
export const routes: RouterConfig = [
  {path: '', component:  HomePageComponent},
  {path: 'home', component:  HomePageComponent},
  {path: 'about', component: AboutPageComponent},
  {path: 'contacts', component: ContactsPageComponent},
  {path: 'features', component: FeaturesPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'profile',component: ProfilePageComponent},
  {path: 'create/invoice', component: CreateInvoicePageComponent},
  {path: 'settings', component: SettingsPageComponent},
  {path: 'invoices', component: PreviousInvoicesPageComponent},
  {path: 'logout', component: LogoutComponent}
];

export const appRouterProvider = [provideRouter(routes)];
