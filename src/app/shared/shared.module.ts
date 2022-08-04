import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { EmailInputComponent } from './components/email-input/email-input.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';

const primeModules = [
  ButtonModule,
  DividerModule,
  InputTextModule,
  PasswordModule,
  ToastModule,
];

@NgModule({
  declarations: [
    EmailInputComponent,
    ErrorMessageComponent,
    PasswordInputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ...primeModules],
  exports: [
    ...primeModules,
    EmailInputComponent,
    ErrorMessageComponent,
    PasswordInputComponent,
  ],
})
export class SharedModule {}
