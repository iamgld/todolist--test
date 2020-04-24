import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { TodoComponent } from './components/todo/todo.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
// import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthService } from './services/auth.service';
import { TodoService } from './services/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // AngularFireStorageModule
  ],
  providers: [
    AuthService,
    TodoService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
