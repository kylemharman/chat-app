import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'app/core/services/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ya-menu-bar',
  templateUrl: './menu-bar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuBarComponent {
  expanded$ = new BehaviorSubject<boolean>(true);
  expandIcon = 'pi pi-angle-left';

  constructor(public user: UserService) {}

  toggleExpanded(): void {
    this.expanded$.next(!this.expanded$.value);
    this.expandIcon = `pi pi-angle-${this.expanded$.value ? 'left' : 'right'}`;
  }
}
