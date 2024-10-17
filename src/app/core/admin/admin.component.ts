import { Component } from '@angular/core';
import User, { Role } from '@shared/types/User';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '@components/dialogs/confirm-dialog/confirm-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import AdminService from '@services/admin.service';
import { EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import TokenService from '@services/token.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatTableModule, MatIcon, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  private readonly snackbarDuration = 5000;
  readonly currentUser: User | null = this.tokenService.getUser() || null;

  Role = Role;
  users$: Observable<User[]>;
  displayedColumns: string[] = ['name', 'role', 'actions'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private tokenService: TokenService,
  ) {
    this.users$ = this.adminService.getAllUsers();
  }

  updateUserRole(user: User) {
    // TODO: Implement API call to update user role
    console.log(`Updating ${user.accountName}'s role to ${user.role}`);
    this.snackBar.open(`${user.accountName}'s role updated to ${user.role}`, 'Close', {
      duration: this.snackbarDuration,
    });
  }

  deleteUser(user: User) {
    const { accountName, userId } = user;
    const currentUser = this.tokenService.getUser();

    if (currentUser && userId === currentUser.userId) {
      this.snackBar.open('You cannot delete your own account.', 'Close', { duration: this.snackbarDuration });
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: `Are you sure you want to delete ${accountName}'s account?` },
    });
    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        switchMap((result) => {
          if (result === true) {
            return this.adminService.deleteUser(userId).pipe(
              switchMap(() =>
                this.users$.pipe(
                  take(1),
                  map((users) => users.filter((u) => u.userId !== userId)),
                ),
              ),
              tap((filteredUsers) => {
                this.users$ = of(filteredUsers);
                this.snackBar.open(`${accountName} has been deleted`, 'Close', { duration: this.snackbarDuration });
              }),
            );
          } else {
            return EMPTY;
          }
        }),
      )
      .subscribe({
        error: (error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open(`Error deleting ${accountName}`, 'Close', { duration: this.snackbarDuration });
        },
      });
  }
}
