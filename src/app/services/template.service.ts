import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class TemplateService {

    baseUrl = 'http://localhost:8080/api/templates';

    constructor(private http: Http, private authService: AuthService) { }

    createAuthorizationHeader(headers?: Headers): Headers {
        let authHeaders = headers || new Headers();
        authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
        return authHeaders;
    }

    getTemplates(): Promise<string[]> {
        return this.http.get(this.baseUrl, {
            headers: this.createAuthorizationHeader()
        })
            .map((res) => res.json())
            .toPromise();
    }

}