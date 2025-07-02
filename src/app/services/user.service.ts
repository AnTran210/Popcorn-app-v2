import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser = signal<User | null>(null);

  constructor() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
      this._currentUser = signal({ username, password });
    } else {
      this._currentUser = signal(null);
    }
  }

  get currentUser(): WritableSignal<User | null> {
    return this._currentUser;
  }

  setUser(username: string, password: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    
    this._currentUser.set({ username, password });
  }

  clearUser(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    
    this._currentUser.set(null);
  }
}