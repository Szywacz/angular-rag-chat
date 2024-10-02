import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, MatCardModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  // Disables screen flashing on authenticated pages while refreshing the page
  isBrowser = signal(false);
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser.set(isPlatformBrowser(this.platformId));
  }
}
