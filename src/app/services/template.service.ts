import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {AuthService} from '../auth/auth.service';

declare var saveAs;

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

    getDefaultTemplate() {
                // Xhr creates new context so we need to create reference to this
        let self = this;

        // Create the Xhr request object
        let xhr = new XMLHttpRequest();
        let url = this.baseUrl;
        xhr.open('GET', url, true);
        xhr.setRequestHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        xhr.setRequestHeader('Authorization', 'Bearer ' + this.authService.getAccessToken());
        xhr.responseType = 'blob';

        // Xhr callback when we get a result back
        // We are not using arrow function because we need the 'this' context
        xhr.onreadystatechange = function () {
            // We use setTimeout to trigger change detection in Zones

            // If we get an HTTP status OK (200), save the file using fileSaver
            if (xhr.readyState === 4 && xhr.status === 200) {
                var blob = new Blob([this.response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
                saveAs(blob, 'default-template');
            }
        };
        xhr.send("");
    }
}