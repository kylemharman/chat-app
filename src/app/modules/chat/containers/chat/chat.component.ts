import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ya-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {

}
