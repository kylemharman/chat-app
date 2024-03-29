import { NgModule } from '@angular/core';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

const redirectToSignIn = () => redirectUnauthorizedTo('/sign-in');

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/root/root.module').then((m) => m.RootModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: ':uid',
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectToSignIn },
    loadChildren: () =>
      import('./modules/chat/chat.module').then((m) => m.ChatModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
