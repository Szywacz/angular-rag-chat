import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsComponent } from '@components/breadcrumbs/breadcrumbs.component';
import AuthService from '@services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule, BreadcrumbsComponent],
})
export class SidebarComponent implements OnInit {
  hasAdminPrivileges: boolean = false;
  hasEditorPrivileges: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.hasEditorPrivileges = this.authService.isEditor();
    this.hasAdminPrivileges = this.authService.isAdmin();
  }
}
