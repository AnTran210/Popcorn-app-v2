import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  user = this.userService.currentUser;

  searchForm = new FormGroup({
    searchQuery: new FormControl(''),
  })

  constructor() { }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    // your logout logic
    this.userService.clearUser();
  }

  handleSearch() {
    //alert(this.searchForm.value.searchQuery);
    alert(localStorage.getItem('username') + "---" + this.user()?.username)
  }
}
