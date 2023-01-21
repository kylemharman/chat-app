import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

import { EmailInputComponent } from './components/email-input/email-input.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { PasswordInputComponent } from './components/password-input/password-input.component';
import { ShellComponent } from './components/shell/shell.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

const primeModules = [
  ButtonModule,
  DividerModule,
  InputTextModule,
  PasswordModule,
  ToastModule,
  MenuModule,
  TooltipModule,
  AvatarModule,
  AvatarGroupModule,
];

@NgModule({
  declarations: [
    EmailInputComponent,
    ErrorMessageComponent,
    PasswordInputComponent,
    ShellComponent,
    MenuBarComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ...primeModules],
  exports: [
    ...primeModules,
    EmailInputComponent,
    ErrorMessageComponent,
    PasswordInputComponent,
    ShellComponent,
    MenuBarComponent,
  ],
})
export class SharedModule {}
