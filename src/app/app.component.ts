import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <p-toast></p-toast>
  `,
})
export class AppComponent implements OnInit {
  constructor(private primeNGConfig: PrimeNGConfig) {}
  title = 'yappy';

  ngOnInit() {
    this.primeNGConfig.ripple = true;
  }
}
