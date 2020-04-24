import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { AuthService } from '../../services/auth.service';

import { Todo } from '../../interfaces/todo';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  todos: Todo[];
  emptyList = true;
  btnEdit = false;
  user: User = {
    uid: 'batman',
    name: 'Batman',
    email: 'soybatman@gmail.com',
    picture: './assets/images/batman.jpg',
    isLogin: false
  };


  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAuth();
  }

  getAuth(): void {
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
          this.getTodolist(this.user);
        } else {
          this.user = {
            uid: 'batman',
            name: 'Batman',
            email: 'soybatman@gmail.com',
            picture: './assets/images/batman.jpg',
            isLogin: false
          };
          this.getTodolist(this.user);
        }
      });
  }

  getTodolist(user: User): void {
    this.todoService.getTodolist(user)
      .subscribe(todos => {
        if (todos.length !== 0) {
          this.todos = todos;
          this.emptyList = false;
        } else {
          this.todos = [];
          this.emptyList = true;
        }
      });
  }

  deleteTodo(todo: Todo, user: User): void {
    this.todoService.deleteTodo(todo, user);
  }

  checkTodo(todo: Todo, user: User): void {
    todo.check = !todo.check;
    this.todoService.updateTodo(todo, user);
  }

  updateTodo(todo: Todo, user: User): void {
    todo.edit = false;
    todo.alertMessage.show = false;
    this.todoService.updateTodo(todo, user);
  }

  writeLetterError(todo: Todo) {
    if (todo.content.length >= todo.minletter) {
      todo.alertMessage.show = false;
      todo.edit = true;
    } else {
      todo.alertMessage.show = true;
      todo.edit = false;
    }
  }

  showBtnEdit(todo: Todo) {
    todo.edit = todo.edit || !todo.edit;
  }

}
