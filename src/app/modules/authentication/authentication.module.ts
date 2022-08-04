import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@yappy/shared';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { GoogleAuthButtonComponent } from './components/google-auth-button/google-auth-button.component';
import { CreateUsernameComponent } from './containers/create-username/create-username.component';
import { UsernameFeedbackComponent } from './components/username-feedback/username-feedback.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    GoogleAuthButtonComponent,
    CreateUsernameComponent,
    UsernameFeedbackComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AuthenticationModule {}
