import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _afAuth: Auth, private _router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const currentUser = this._afAuth.currentUser;
    const uid = route.paramMap.get('uid');

    if (!currentUser) {
      return this._router.navigateByUrl('sign-in');
    }

    return currentUser.uid === uid
      ? true
      : await this._router.navigateByUrl(`${currentUser.uid}`);
  }
}
