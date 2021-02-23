import { authService } from './auth.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class authGuard implements CanActivate {

    constructor(private authService: authService, private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot)
            : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
            
    {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if(isAuth)
                {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        )
    }
}