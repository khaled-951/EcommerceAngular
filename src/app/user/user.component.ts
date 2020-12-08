import { Component, OnInit } from '@angular/core';
import {User} from '../model/User';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  email = 'test@test.tn' ;
  password = '12345' ;
  showError = false ;

  constructor(private UserServiceInstance: UserService) { }

  ngOnInit(): void {

  }

  logUserIn(email: string, password: string): void{
    this.UserServiceInstance.logUserIn(this.email, this.password);
    this.showError = true ;
  }

}
