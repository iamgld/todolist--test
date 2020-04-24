import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from '../interfaces/todo';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private usersCollection: AngularFirestoreCollection<Todo>;
  private todosCollection: AngularFirestoreCollection<Todo>;
  private todoDoc: AngularFirestoreDocument<Todo>;
  private todos: Observable<Todo[]>;
  private todo: Observable<Todo>;

  constructor(
    private afStore: AngularFirestore
  ) {
    this.usersCollection = this.afStore.collection('users');
  }

  getTodolist(user: User): Observable<Todo[]> {
    this.todosCollection = this.usersCollection
      .doc(user.uid).collection('todos', ref => ref.orderBy('date', 'desc'));
    this.todos = this.todosCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Todo;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todosCollection = this.usersCollection.doc(todo.owner.uid).collection('todos');
    this.todosCollection.add(todo);
  }

  updateTodo(todo: Todo, user: User): void {
    this.todoDoc = this.afStore.doc(`users/${user.uid}/todos/${todo.id}`);
    this.todoDoc.update(todo);
  }

  deleteTodo(todo: Todo, user: User): void {
    this.todoDoc = this.afStore.doc(`users/${user.uid}/todos/${todo.id}`);
    this.todoDoc.delete();
  }
}
