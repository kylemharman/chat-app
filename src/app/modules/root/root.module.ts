import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { RootRoutingModule } from './root-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RootRoutingModule],
})
export class RootModule {}
