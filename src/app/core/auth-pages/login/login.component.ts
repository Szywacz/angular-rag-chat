import TokenService from '@/app/shared/services/token.service';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  // TODO: Wrong credentials error on not found in db. 
  accountFound = false;

  constructor(private fb: FormBuilder, private tokenService: TokenService, private router: Router) {}

  loginForm = this.fb.group({
    accountName: ['', [Validators.required, Validators.maxLength(32)]],
    password: ['', [Validators.required, Validators.maxLength(64)]],
  });

  onSubmit() {
    console.log(this.loginForm.value);
  }

  onLogin() {
    this.tokenService.setToken('mock_token');
    this.router.navigate(['/files']);
  }
}
