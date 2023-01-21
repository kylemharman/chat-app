import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './containers/chat/chat.component';
import { SharedModule } from '@yappy/shared';

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, ChatRoutingModule, SharedModule],
})
export class ChatModule {}
