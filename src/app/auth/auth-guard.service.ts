import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
        if(this.authService.isLoggedIn) {
            return true;
        }
        // this.authService.redirectUrl = state.url;

        var result = confirm("Redirect to login page?");
        if(result) {
            this.authService.login();
        }
        return false;
    }
}