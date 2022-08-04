import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@yappy/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  readonly passwordMinLength = 6;
  readonly passwordMaxLength = 30;

  signUpForm = this._fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(this.passwordMinLength),
        Validators.maxLength(this.passwordMaxLength),
      ],
    ],
  });

  get email() {
    return this.signUpForm.controls.email;
  }

  get password() {
    return this.signUpForm.controls.password;
  }

  constructor(private _fb: FormBuilder, private _auth: AuthenticationService) {}

  async signUpWithGoogle(): Promise<void> {
    await this._auth.signInWithGoogle();
  }

  async signUp(): Promise<void> {
    if (this.signUpForm.invalid) {
      return;
    }
    await this._auth.signUpWithEmailAndPassword(
      this.email.value,
      this.password.value
    );
  }
}
