import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private userService = inject(UserService);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private router: Router) { }

  login() {
    if (this.loginForm.value.username !== undefined && this.loginForm.value.username !== '') {
      this.userService.setUser(String(this.loginForm.value.username), String(this.loginForm.value.password))
      this.router.navigate(['/dashboard']);
    }
    
  }
}
