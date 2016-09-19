import {Http, Headers} from "@angular/http";
import {Company} from "../models/company";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class AutocompleteService{

  private baseUrl = 'http://localhost:8080';
  private serviceUrl = this.baseUrl + '/api/companies/brra?eik=';

  constructor(private http: Http, private authService: AuthService) { }

  createAuthorizationHeader(headers?: Headers): Headers {
    let authHeaders = headers || new Headers();
    authHeaders.append('Authorization', 'Bearer ' + this.authService.getAccessToken());
    return authHeaders;
  }

  getCompany(eik: string): Promise<Company> {
    return this.http.get(this.serviceUrl + eik, {
        headers: this.createAuthorizationHeader()
      })
      .map((res) => res.json())
      .toPromise();
  }
}
