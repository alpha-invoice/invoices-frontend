import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {OAuthService} from 'angular2-oauth2/oauth-service'


@Injectable()
export class AuthService {
    isLoggedIn: boolean;

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private oAuthService: OAuthService) {
        // Login-Url
        this.oAuthService.loginUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

        // URL of the SPA to redirect the user to after login
        this.oAuthService.redirectUri = window.location.origin + '/main';

        // The SPA's id. Register SPA with this id at the auth-server
        this.oAuthService.clientId = '964606049841-pum7a5v4gp9r9aik7g1ma0qnhj5hr112.apps.googleusercontent.com';

        // set the scope for the permissions the client should request
        this.oAuthService.scope = 'openid profile email';

        // set to true, to receive also an id_token via OpenId Connect (OIDC) in addition to the
        // OAuth2-based access_token
        this.oAuthService.oidc = true;

        // Use setStorage to use sessionStorage or another implementation of the TS-type Storage
        // instead of localStorage
        this.oAuthService.setStorage(sessionStorage);

        // To also enable single-sign-out set the url for your auth-server's logout-endpoint here
        this.oAuthService.logoutUrl = 'https://accounts.google.com/logout';

        // This method just tries to parse the token within the url when
        // the auth-server redirects the user back to the web-app
        // It dosn't initiate the login
        this.oAuthService.tryLogin({});

        this.isLoggedIn = this.oAuthService.getAccessToken();
    }

    login() {
        this.oAuthService.initImplicitFlow();
    }

    logout() {
        return new Promise((resolve) => {
            this.oAuthService.logOut();
            resolve();
        }).then(()=>{this.isLoggedIn = false;});
    }

    getAccessToken() {
      return this.oAuthService.getAccessToken();
    }
}
