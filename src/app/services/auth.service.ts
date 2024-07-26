import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, CreateUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private apiUrl = 'http://localhost:8080/auth'; // Backend URL

  constructor(private http: HttpClient) {
    // Initialize currentUserSubject with user details from localStorage if available
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        // Store user details and JWT token in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // Remove user from localStorage and clear the currentUserSubject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  saveToken(token: string): void {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      currentUser.jwt = token;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);
    }
  }

  register(user: CreateUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
