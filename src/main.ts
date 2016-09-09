import { bootstrap } from '@angular/platform-browser-dynamic';
import { disableDeprecatedForms, provideForms} from '@angular/forms';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import {appRouterProvider} from "./app/app.routing";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  appRouterProvider,
  provideForms(),
  disableDeprecatedForms()
]).catch(err=>console.log(err));
