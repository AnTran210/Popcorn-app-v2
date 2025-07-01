import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn = false;

  searchForm = new FormGroup({
    searchQuery: new FormControl(''),
  })

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    const username = localStorage.getItem('username');
    
    if (username) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  login() {
    // your login logic
    localStorage.setItem('username', 'Alice');
    this.isLoggedIn = true;
  }

  logout() {
    // your logout logic
    localStorage.removeItem('username');
    this.isLoggedIn = false;
  }

  handleSearch() {
    alert(this.searchForm.value.searchQuery);
  }
}
