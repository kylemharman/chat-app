import { NgModule } from '@angular/core';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsernameComponent } from './containers/create-username/create-username.component';
import { ResetPasswordComponent } from './containers/reset-password/reset-password.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';

const redirectToSignIn = () => redirectUnauthorizedTo('/sign-in');

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'create-username',
    component: CreateUsernameComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToSignIn },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
