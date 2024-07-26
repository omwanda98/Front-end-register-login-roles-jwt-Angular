import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User, CreateUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  newUser: CreateUser = { username: '', password: '' }; // Using CreateUser for new user creation

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.adminService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUser() {
    this.adminService.addUser(this.newUser).subscribe(() => {
      this.fetchUsers();
      this.newUser = { username: '', password: '' }; // Reset newUser
    });
  }

  removeUser(userId: number | undefined) {
    if (userId !== undefined) {
      this.adminService.removeUser(userId).subscribe(() => {
        this.fetchUsers();
      });
    }
  }
}
