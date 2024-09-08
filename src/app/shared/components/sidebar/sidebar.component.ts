import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatListModule, MatIconModule],
})
export class SidebarComponent implements OnInit {
  hasAdminPrivileges: boolean = false;

  constructor() {}

  ngOnInit() {
    // TODO: get user privileges from backend
    this.hasAdminPrivileges = true;
  }
}
