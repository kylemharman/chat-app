import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { FirestoreService } from '../services/firestore.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class CreateUsernameGuard implements CanActivate {
  constructor(
    private _user: UserService,
    private _router: Router,
    private _fs: FirestoreService
  ) {}

  canActivate(): boolean | UrlTree {
    return true;
    // do this in an observable
    // const userDocument = await this._fs.docSnap(
    //   `${RootCollection.Users}/${user?.uid}`
    // );
    // return !userDocument.exists()
    //   ? true
    //   : this._router.navigateByUrl(`${user?.uid}`);
  }
}
