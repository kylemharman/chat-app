import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@yappy/core';
import { ChatComponent } from './containers/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    title: 'Chats',
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
