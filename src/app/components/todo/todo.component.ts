import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';

import { Todo } from '../../interfaces/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})
export class TodoComponent implements OnInit {

  todo: Todo = {
    id: '',
    content: '',
    check: false,
    edit: false,
    date: 0,
    minletter: 5,
    alertMessage: {
      show: false,
      message: ''
    },
    owner: {
      uid: 'batman',
      name: 'Batman',
      email: 'soybatman@gmail.com',
      picture: './assets/images/batman.jpg',
      isLogin: false
    }
  };

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.todo.alertMessage.message = `
      The minimum number of characters
      needed to create a todo is ${this.todo.minletter}
    `;
    this.getAuth();
  }

  addTodo(): void {
    this.todo.edit = false;
    this.todo.date = new Date().getTime();
    // this.todo.alertMessage.show = false
    this.todoService.addTodo(this.todo);
    this.todo.content = '';
  }

  writeLetterError() {
    if (this.todo.content.length >= this.todo.minletter) {
      this.todo.alertMessage.show = false;
      this.todo.edit = true;
    } else {
      this.todo.alertMessage.show = true;
      this.todo.edit = false;
    }
  }

  checkLogin() {
    this.todo.owner.isLogin
      ? this.onLogout()
      : this.onLogin();
  }

  getAuth() {
    this.authService.getAuth()
      .subscribe(auth => {
        if (auth) {
          this.todo.owner = {
            uid: auth.uid,
            name: auth.displayName,
            email: auth.email,
            picture: auth.photoURL,
            isLogin: true
          };
        }
      });
  }

  onLogin() {
    this.authService.loginWithGoogle();
  }

  onLogout() {
    this.authService.signOut();
    this.todo.owner = {
      uid: 'batman',
      name: 'Batman',
      email: 'soybatman@gmail.com',
      picture: './assets/images/batman.jpg',
      isLogin: false
    };
  }

}
