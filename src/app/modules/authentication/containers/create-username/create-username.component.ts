import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FirestoreService, IUsername } from '@yappy/core';
import { filterNil } from '@yappy/shared';
import { UserService } from 'app/core/services/user.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { debounceTime, filter, map, takeUntil, tap } from 'rxjs/operators';

export type UsernameFeedback = { icon: string; message: string; color: string };

@Component({
  selector: 'ya-create-username',
  templateUrl: './create-username.component.html',
  styleUrls: ['./create-username.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsernameComponent implements OnDestroy {
  private _onDestroy$ = new Subject<void>();
  readonly usernameMinLength = 3;
  readonly usernameMaxLength = 21;

  username = new FormControl('', [
    Validators.required,
    Validators.minLength(this.usernameMinLength),
    Validators.maxLength(this.usernameMaxLength),
  ]);
  username$ = new Subject<string>();
  loading$ = new BehaviorSubject(false);
  isValid$ = new BehaviorSubject(false);
  feedback$: Observable<UsernameFeedback>;

  constructor(private _fs: FirestoreService, private _user: UserService) {
    this.username.valueChanges
      .pipe(filterNil(), takeUntil(this._onDestroy$))
      .subscribe((value) => {
        this.username$.next(this._formatInput(value));
      });

    this.username$
      .pipe(
        tap(() => this.isValid$.next(false)),
        filter(() => this.username.valid),
        tap(() => this.loading$.next(true)),
        debounceTime(1000),
        takeUntil(this._onDestroy$)
      )
      .subscribe((username) => this._checkUsername(username));

    this.feedback$ = combineLatest([this.loading$, this.isValid$]).pipe(
      map(([loading, valid]) => this._getFeedback(loading, valid))
    );
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  async createUser(): Promise<void> {
    if (!this.username.value || !this.isValid$.value) {
      return;
    }
    await this._user.createUser(this.username.value);
  }

  private _formatInput(value: string): string {
    const pattern = /[^a-zA-Z0-9_]/g;
    const result = value.replace(pattern, '');
    this.username.patchValue(result, { emitEvent: false });
    return result;
  }

  private async _checkUsername(username: string): Promise<void> {
    const doc = await this._fs.docSnap<IUsername>(`usernames/${username}`);
    this.isValid$.next(!doc.exists());
    this.loading$.next(false);
  }

  private _getFeedback(loading: boolean, valid: boolean): UsernameFeedback {
    if (loading) {
      return {
        icon: `pi pi-search`,
        message: `Checking availability...`,
        color: `text-amber-500`,
      };
    }
    if (!loading && !valid && this.username.valid) {
      return {
        icon: `pi pi-ban`,
        message: `Sorry, ${this.username.value} is taken`,
        color: `text-rose-500`,
      };
    }
    if (valid) {
      return {
        icon: `pi pi-check-circle`,
        message: `${this.username.value} is available.`,
        color: `text-green-500`,
      };
    }
    return {
      icon: ``,
      message: `Username must be between ${this.usernameMinLength} and ${this.usernameMaxLength} characters`,
      color: `text-slate-500`,
    };
  }
}
