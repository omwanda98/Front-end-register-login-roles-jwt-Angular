import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private refreshTokenReceivedSubject = new Subject<any>();
  $refreshTokenReceived = this.refreshTokenReceivedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/user/details');
  }

  getUsers(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/users');
  }

  onLogin(loginData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/auth/login', loginData);
  }

  emitRefreshTokenReceived(data: any) {
    this.refreshTokenReceivedSubject.next(data);
  }
}
