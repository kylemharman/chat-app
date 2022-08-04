import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ya-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input() message = '';
}
