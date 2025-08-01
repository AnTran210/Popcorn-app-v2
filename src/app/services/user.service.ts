import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../models/user.model';
import { ResponceModel } from '../models/responce.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  PopcornApi_HostAddress = "https://localhost:7241";
  private _currentUser = signal<string | null>(null);

  constructor() {
    const username = localStorage.getItem('username');

    if (username) {
      this._currentUser = signal( username );
    } else {
      this._currentUser = signal(null);
    }
  }

  userRegister(user: User) {
    const url = `${this.PopcornApi_HostAddress}/api/user/register`;
    const payload = {
      username: user.username,
      password: user.password
    };
    return this.http.post(url, payload);
  }

  userLogin(user: User) {
    const url = `${this.PopcornApi_HostAddress}/api/user/login`;
    const payload = {
      username: user.username,
      password: user.password
    };
    return this.http.post(url, payload);
  }

  askGemini(prompttext: string) {
    const url = `${this.PopcornApi_HostAddress}/api/gemini`;
    const payload = {
      prompt: prompttext
    };
    return this.http.post<ResponceModel>(url, payload);
  }

  get currentUser(): WritableSignal<string | null> {
    return this._currentUser;
  }

  setUser(username: string): void {
    localStorage.setItem('username', username);
    
    this._currentUser.set( username );
  }

  clearUser(): void {
    localStorage.removeItem('username');
    
    this._currentUser.set(null);
  }
}