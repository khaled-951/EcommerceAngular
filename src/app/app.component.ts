import { Component } from '@angular/core';
import {UserService} from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecom';

  constructor(private UserServiceInstance: UserService) {
  }
  isUserLoggedIn(): boolean{
    return this.UserServiceInstance.currentUser !== null ;
  }
  logUserOut(): void{
    this.UserServiceInstance.logUserOut() ;
  }
  getCurrentUserFirstName(): string{
    return this.UserServiceInstance.currentUser.firstName ;
  }
}
