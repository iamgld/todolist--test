import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore
  ) { }

  getAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    // .then(credential => credential.user);
    // this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
  }

  signOut() {
    return this.afAuth.signOut();
  }
}
