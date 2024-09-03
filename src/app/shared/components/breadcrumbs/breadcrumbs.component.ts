import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  navItems: string[] = this.router.url.slice(1).split('/');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.generateBreadcrumbs();
    });
    this.generateBreadcrumbs();
  }

  private generateBreadcrumbs() {
    let route = this.activatedRoute.root ? this.activatedRoute.root : null;
    let url = '';
    this.breadcrumbs = [];

    while (route) {
      if (route.routeConfig && route.routeConfig.path && route.routeConfig.path !== '') {
        const path: string = route.routeConfig.path;
        const label = decodeURIComponent(path).toUpperCase();
        url += `/${path}`;

        this.breadcrumbs.push({ label, url });
      }

      route = route.firstChild;
    }
  }
}
