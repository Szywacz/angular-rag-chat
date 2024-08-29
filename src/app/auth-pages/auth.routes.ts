import { Route } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthLayoutComponent } from "../shared/layouts/auth-layout/auth-layout.component";

export const AUTH_ROUTES: Route[] = [
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
  },
  {
    path: "**",
    pathMatch: "full",
    redirectTo: "login",
  },
];
