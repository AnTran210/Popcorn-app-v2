import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  onSubmit() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
    }
    else console.log(this.loginForm.value);
  }

  constructor() {}

  ngOnInit() {
    this.loginForm.get('username')?.valueChanges.subscribe(value => {
      if (this.loginForm.get('username')?.touched && this.loginForm.get('username')?.invalid) {
        console.log(this.loginForm.value);
      }
    });
  }

  login() {
    if (this.loginForm.invalid) {
      if (this.loginForm.get('username')?.invalid) {
        alert("Username can't be empty.");
      }
      if (this.loginForm.get('password')?.invalid) {
        alert("Password must be at least 6 characters.");
      }
      return;
    }
    this.userService.setUser(String(this.loginForm.value.username), String(this.loginForm.value.password));
    this.router.navigate(['/dashboard']);
  }
}
