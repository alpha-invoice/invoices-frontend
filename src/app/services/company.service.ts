import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../auth/auth.service';
import "rxjs/add/operator/toPromise";

@Injectable()
export class OwnCompanyService {

    baseUrl = 'http://localhost:8080/api/companies';

    constructor(private http: Http, private authService: AuthService) { }

    createAuthorizationHeader(headers?: Headers): Headers {
        let authHeaders = headers || new Headers();
        authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
        return authHeaders;
    }

    getOwnCompany(eik: String): Promise<String> {
        let serviceUrl = this.baseUrl + eik;
        return this.http.get(serviceUrl, {
            headers: this.createAuthorizationHeader()
        }).map((res) => res.json())
            .toPromise();
    }

}