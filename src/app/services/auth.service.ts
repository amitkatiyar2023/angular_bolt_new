import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private users: User[] = [
    { id: 1, email: 'user1@example.com', username: 'user1', password: 'password1' },
    { id: 2, email: 'user2@example.com', username: 'user2', password: 'password2' },
  ];

  constructor() {}

  login(email: string, password: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      this.currentUserSubject.next(userWithoutPassword);
      return of(true);
    }
    return of(false);
  }

  register(user: User): Observable<boolean> {
    if (this.users.find(u => u.email === user.email)) {
      return of(false);
    }
    this.users.push({ ...user, id: this.users.length + 1 });
    return of(true);
  }

  getUsers(): User[] {
    return this.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
}