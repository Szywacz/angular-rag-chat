import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import TokenService from '@services/token.service';
import { BreadcrumbsComponent } from '@components/breadcrumbs/breadcrumbs.component';

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

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.hasEditorPrivileges = this.tokenService.isEditor();
    this.hasAdminPrivileges = this.tokenService.isAdmin();
  }
}
