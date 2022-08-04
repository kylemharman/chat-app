import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const EMAIL_INPUT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmailInputComponent),
  multi: true,
};

@Component({
  selector: 'ya-email-input',
  templateUrl: './email-input.component.html',
  styleUrls: ['./email-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EMAIL_INPUT_VALUE_ACCESSOR],
})
export class EmailInputComponent implements ControlValueAccessor {
  private _onDestroy$ = new Subject<void>();

  email = new FormControl('', { nonNullable: true });
  disabled$ = new BehaviorSubject(false);

  onChange = (_value: string) => {};
  onTouched = () => {};

  @Input() set value(value: string) {
    if (value) {
      this.email.setValue(value);
    }
  }

  @Input()
  set errors(errors: ValidationErrors | null) {
    this.email.setErrors(errors);
  }

  constructor() {
    this.email.valueChanges
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

  writeValue(emailAddress: string): void {
    this.email.setValue(emailAddress);
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
