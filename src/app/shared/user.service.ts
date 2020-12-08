import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersUrl = 'http://127.0.0.1:3000/Users';
  currentUser: User  = null ;

  constructor(private http: HttpClient, private router: Router) { }

  logUserIn(login: string, password: string): void{
    this.http.get<User>(this.usersUrl + '?email=' + login + '&password=' + password).subscribe(
      (data) => { if(data[0].email === login && data[0].password === password)
      {this.currentUser = data[0]; this.router.navigate(['products']); } });
  }
  logUserOut(): void{
    this.currentUser = null ;
    this.router.navigate(['login']);
  }
}
