import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterLink } from "@angular/router";
import CustomValidators from "../../shared/utils/custom-validators";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  constructor(private fb: FormBuilder) {}

  registerForm = this.fb.group(
    {
      accountName: ["", [Validators.required, Validators.minLength(7)]],
      password: ["", [Validators.required, Validators.minLength(7)]],
      confirmPassword: ["", [Validators.required]],
    },
    {
      validators: [CustomValidators.matching("password", "confirmPassword")],
    },
  );

  onSubmit() {
    if (this.registerForm.valid) console.log("form is valid");
    else {
      console.log("form is invalid");
    }
  }
}
