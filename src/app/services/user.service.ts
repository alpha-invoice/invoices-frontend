import {Http, Headers, Response} from "@angular/http";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    userInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo';

    constructor(private http: Http, private authService: AuthService) { }
    
    createAuthorizationHeader(headers?: Headers): Headers {
        let authHeaders = headers || new Headers();
        authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
        return authHeaders;
    }

    getUserEmail(): Promise<Response> {
    return this.http.get(this.userInfoUrl, {
        headers: this.createAuthorizationHeader()
      })
      .map((res) => res)
      .toPromise();
  }


}