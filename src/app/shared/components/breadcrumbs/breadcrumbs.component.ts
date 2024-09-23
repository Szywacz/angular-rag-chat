import { Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, tap } from 'rxjs';
import { BreadcrumbsService } from './breadcrumbs.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Breadcrumb {
  label: string;
  url: string;
}

/**
 * This component dynamically generates and displays a breadcrumb navigation
 * based on the current router state. It tracks the router events and updates
 * the breadcrumbs as the route changes. The breadcrumbs are derived from the
 * `ActivatedRoute` and the URL structure, allowing for dynamic labels, including
 * the last breadcrumb label customization via `BreadcrumbsService`.
 *
 * ### Usage:
 * This component should be used in conjunction with the `BreadcrumbsService` to optionally override the last
 * breadcrumb label. The breadcrumbs are displayed using the corresponding template and styles.
 *
 * ### Example:
 * ```html
 * <app-breadcrumbs></app-breadcrumbs>
 * ```
 *
 * ### Notes:
 * - The last breadcrumb label can be customized through the `BreadcrumbsService`.
 * - If a route contains a dynamic `:id` parameter, it is replaced with the actual value from the URL unless custom label is passed through service.
 */
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
  destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbsService: BreadcrumbsService,
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.generateBreadcrumbs();
    });

    this.breadcrumbsService.customLastLabel$.pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((label) => {
        if (this.breadcrumbs.length > 0) {
          this.breadcrumbs[this.breadcrumbs.length - 1].label =
            label || this.breadcrumbs[this.breadcrumbs.length - 1].label;
        }
      }),
    );

    this.generateBreadcrumbs();
  }

  private generateBreadcrumbs() {
    let route = this.activatedRoute.root ? this.activatedRoute.root : null;
    let url = '';
    this.breadcrumbs = [];

    while (route) {
      if (route.routeConfig && route.routeConfig.path && route.routeConfig.path !== '') {
        const path: string = route.routeConfig.path;
        let label = '';

        if (path.endsWith(':id')) {
          const urlSegment = this.router.url.split('/').pop() || '';
          label = urlSegment.toUpperCase();
        } else {
          label = decodeURIComponent(path).toUpperCase();
        }
        url += `/${path}`;

        this.breadcrumbs.push({ label, url });
      }

      route = route.firstChild;
    }

    if (this.breadcrumbsService.customLastLabel$) {
      this.breadcrumbsService.customLastLabel$.pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((label) => (label ? (this.breadcrumbs[this.breadcrumbs.length - 1].label = label) : null)),
      );
    }
  }
}
