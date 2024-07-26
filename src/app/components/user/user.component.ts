import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  userDetails: any;
  birthdate: string = ''; // Initialized directly
  age: number = 0; // Initialized directly

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserDetails().subscribe((details: any) => {
      this.userDetails = details;
      this.calculateAge(); // Calculate age after getting user details
    });
  }

  calculateAge() {
    if (this.birthdate) { // Ensure birthdate is defined
      const birthdate = new Date(this.birthdate);
      const ageDifMs = Date.now() - birthdate.getTime();
      const ageDate = new Date(ageDifMs); // milliseconds from epoch
      this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }
}
