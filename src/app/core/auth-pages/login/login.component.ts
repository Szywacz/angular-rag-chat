import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import AuthService from '@services/auth.service';
import { finalize, shareReplay, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatInputModule, MatButtonModule, MatFormFieldModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  errorMessage = '';
  isLoading = false;
  authSub?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = this.fb.group({
    accountName: ['', [Validators.required, Validators.maxLength(32)]],
    password: ['', [Validators.required, Validators.maxLength(64)]],
  });

  onSubmit() {
    if (!this.loginForm.valid) return;

    const { accountName, password } = this.loginForm.getRawValue();

    if (!(accountName && password)) return;
    this.onLogin(accountName, password);
  }

  onLogin(username: string, password: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.authSub = this.authService
      .login(username, password)
      .pipe(
        tap((response) => {
          this.authService.setCredentials(response);
          this.router.navigate(['/']);
        }),
        shareReplay(),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
        },
      });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
