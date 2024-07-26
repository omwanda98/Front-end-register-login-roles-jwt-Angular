import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe((response: any) => {
      this.authService.saveToken(response.jwt);
      const tokenPayload = JSON.parse(atob(response.jwt.split('.')[1]));
      const roles = tokenPayload.roles;

      if (roles.includes('ADMIN')) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/user']);
      }
    });
  }
}
