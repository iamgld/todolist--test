import { Component, OnInit } from '@angular/core';

import { User } from './interfaces/user';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  user: User = {
    uid: 'batman',
    name: 'Batman',
    email: 'soybatman@gmail.com',
    picture: './assets/images/batman.jpg',
    isLogin: false
  };

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getAuth();
  }

  getAuth() {
    this.authService.getAuth()
      .subscribe(auth => {
        if (auth) {
          this.user = {
            uid: auth.uid,
            name: auth.displayName,
            email: auth.email,
            picture: auth.photoURL,
            isLogin: true
          };
        } else {
          this.user = {
            uid: 'batman',
            name: 'Batman',
            email: 'soybatman@gmail.com',
            picture: './assets/images/batman.jpg',
            isLogin: false
          };
        }
      });
  }
}
