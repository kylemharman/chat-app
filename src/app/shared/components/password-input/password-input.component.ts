import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl,
  ValidationErrors,
} from '@angular/forms';
import { Subject, BehaviorSubject, takeUntil } from 'rxjs';

export const PASSWORD_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PasswordInputComponent),
  multi: true,
};

@Component({
  selector: 'ya-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PASSWORD_INPUT_VALUE_ACCESSOR],
})
export class PasswordInputComponent implements ControlValueAccessor {
  private _onDestroy$ = new Subject<void>();

  showPassword = false;
  password = new FormControl('', { nonNullable: true });
  disabled$ = new BehaviorSubject(false);

  onChange = (_value: string) => {};
  onTouched = () => {};

  @Input() set value(value: string) {
    if (value) {
      this.password.setValue(value);
    }
  }

  @Input()
  set errors(errors: ValidationErrors | null) {
    this.password.setErrors(errors);
  }

  constructor() {
    this.password.valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  writeValue(password: string): void {
    this.password.setValue(password);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled$.next(isDisabled);
  }
}
