import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsComponent {
  constructor(private router: Router) {}

  navItems: string[] = this.router.url.slice(1).split('/');

  concatenatePreviousRoutes(i: number) {
    return this.navItems.slice(0, i + 1).join('/');
  }
}
