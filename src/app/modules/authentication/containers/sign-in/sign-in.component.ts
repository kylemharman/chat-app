import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@yappy/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  signInForm = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.signInForm.controls.email;
  }

  get password() {
    return this.signInForm.controls.password;
  }

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _auth: AuthenticationService
  ) {}

  async signIn(): Promise<void> {
    if (this.signInForm.invalid) {
      return;
    }
    await this._auth.signInWithEmailAndPassword(
      this.email.value,
      this.password.value
    );
  }

  async signInWithGoogle(): Promise<void> {
    await this._auth.signInWithGoogle();
  }

  resetPassword(): void {
    this._router.navigateByUrl('reset-password');
  }
}
