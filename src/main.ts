import {bootstrap} from "@angular/platform-browser-dynamic";
import {disableDeprecatedForms, provideForms} from "@angular/forms";
import {enableProdMode} from "@angular/core";
import {AppComponent, environment} from "./app/";
import {HTTP_PROVIDERS} from "@angular/http";
import {appRouterProvider} from "./app/app.routing";
import {AuthGuard} from "./app/auth/auth-guard.service";
import {AuthService} from "./app/auth/auth.service";
import {OAuthService} from "angular2-oauth2/oauth-service";

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  appRouterProvider,
  OAuthService,
  AuthService,
  AuthGuard,
  provideForms(),
  disableDeprecatedForms()
]).catch(err=>console.log(err));
