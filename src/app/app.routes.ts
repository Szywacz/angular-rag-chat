import { Routes } from "@angular/router";
import { ErrorComponent } from "./shared/layouts/error/error.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "files",
    loadChildren: () => import("./files-manager/files.routes").then((r) => r.FILES_ROUTES),
  },
  {
    path: "**",
    pathMatch: "full",
    component: ErrorComponent,
  },
];
