import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { HeaderComponent } from '../header/header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private formSubscription: Subscription | undefined;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log("Invalid value");
    } else console.log("Valid value");
  }

  ngOnInit() {
    this.formSubscription = this.loginForm.get('username')?.valueChanges.subscribe((value) => {
      if (
        this.loginForm.get('username')?.touched &&
        this.loginForm.get('username')?.invalid
      ) {
        console.log("invalid input - value changes");
      }
    });
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
      console.log('Subscription unsubscribed!');
    }
  }

  login() {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('username')?.invalid) {
        alert("Username can't be empty.");
      }
      if (this.loginForm.get('password')?.invalid) {
        alert('Password must be at least 6 characters.');
      }
      return;
    }
    let user: User = {
      username: this.loginForm.value.username
        ? this.loginForm.value.username
        : '',
      password: this.loginForm.value.password
        ? this.loginForm.value.password
        : '',
    };
    this.userService.userLogin(user).subscribe({
      next: (response) => {
        console.log('✅ Success (200):', response);
        this.userService.setUser(user.username);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('❌ Error:', error);

        if (error.status === 400) {
          console.warn('Bad Request (400):', error.error);
          alert(error.error.message)
        } else if (error.status === 404) {
          console.warn('Not Found (404):', error.message);
          alert(error.error.message)
        }
      },
    });
  }

  register() {
    this.router.navigate(['/register']);
  }
}
