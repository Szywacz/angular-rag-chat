import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@components/footer/footer.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
