import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '@yappy/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _auth: AuthenticationService) {}

  resetPassword(): void {
    if (this.email.invalid) {
      return;
    }
    console.log(this.email.value);
  }
}
