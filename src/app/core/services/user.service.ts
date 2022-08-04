import { Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

import { IUser } from '../models/user';
import { IUsername } from '../models/username';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<User | null>;
  user: User | null;

  constructor(
    private _afAuth: Auth,
    private _fs: FirestoreService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.user = this._afAuth.currentUser;
    this.user$ = authState(this._afAuth);
  }

  async createUser(username: string): Promise<void> {
    if (!this.user) return;

    const { uid, displayName, photoURL } = this.user;
    const usernameDoc = this._fs.doc<IUsername>(`usernames/${username}`);
    const userDoc = this._fs.doc<IUser>(`users/${uid}`);

    const batch = this._fs.batch();
    batch.set(usernameDoc, { uid: this.user.uid });
    batch.set(userDoc, { uid, username, displayName, photoURL });

    try {
      await batch.commit();
      await this._router.navigate([`${this.user.uid}`]);
      this._messageService.add({
        severity: `success`,
        summary: `Account Created`,
        detail: `You're all set, happy yapping.`,
      });
    } catch (error: any) {
      this._messageService.add({
        severity: `error`,
        summary: `Unable to create account`,
        detail: `${error.message}`,
      });
      return;
    }
  }
}
