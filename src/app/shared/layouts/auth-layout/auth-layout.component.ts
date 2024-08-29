import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-auth-layout",
  standalone: true,
  imports: [RouterModule, MatCardModule],
  templateUrl: "./auth-layout.component.html",
  styleUrl: "./auth-layout.component.scss",
})
export class AuthLayoutComponent {}
