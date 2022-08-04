import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IUser } from '../models/user';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private _afAuth: Auth,
    private _fs: FirestoreService,
    private _router: Router,
    private _message: MessageService
  ) {}

  async signInWithGoogle(): Promise<void> {
    await signInWithPopup(this._afAuth, new GoogleAuthProvider())
      .then(({ user }) => this._redirectUser(user))
      .catch((error) => {
        this._displayErrorMessage(error.message);
      });
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    await signInWithEmailAndPassword(this._afAuth, email, password)
      .then(({ user }) => this._redirectUser(user))
      .catch((error) => {
        this._displayErrorMessage(error.message);
      });
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    await createUserWithEmailAndPassword(this._afAuth, email, password)
      .then(() => this._router.navigate([`create-username`]))
      .catch((error) => {
        this._displayErrorMessage(error.message);
      });
  }

  async signOut(): Promise<void> {
    await signOut(this._afAuth)
      .catch((error) => this._displayErrorMessage(error.message))
      .finally(() => this._router.navigateByUrl('sign-in'));
  }

  private _displayErrorMessage(message: string): void {
    console.error(message);
    this._message.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  private async _redirectUser(user: User): Promise<void> {
    const userDocument = await this._fs.docSnap<IUser>(`users/${user.uid}`);
    userDocument.exists()
      ? await this._router.navigate([`${user.uid}`])
      : await this._router.navigate([`create-username`]);
  }
}
