import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UsernameFeedback } from '../../containers/create-username/create-username.component';

@Component({
  selector: 'ya-username-feedback',
  templateUrl: './username-feedback.component.html',
  styleUrls: ['./username-feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsernameFeedbackComponent {
  @Input() username: string | null = '';
  @Input() feedback: UsernameFeedback = {
    icon: '',
    message: '',
    color: '',
  };
}
