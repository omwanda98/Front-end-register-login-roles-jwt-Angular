import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userDetails: any;
  birthdate: string;
  age: number;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserDetails().subscribe(details => {
      this.userDetails = details;
    });
  }

  calculateAge() {
    const birthdate = new Date(this.birthdate);
    const ageDifMs = Date.now() - birthdate.getTime();
    const ageDate = new Date(ageDifMs); // milliseconds from epoch
    this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
