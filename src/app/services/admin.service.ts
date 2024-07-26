import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, CreateUser } from '../interfaces/user.interface';  

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8000/admin/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: CreateUser): Observable<User> { // Use CreateUser here
    return this.http.post<User>(this.apiUrl, user);
  }

  removeUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${userId}`);
  }
}
