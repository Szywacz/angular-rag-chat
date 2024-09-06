import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  template: '<p>Page not found.</p>',
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    console.error(`Attempt to access non-existent path: ${this.router.url}`);
  }
}
