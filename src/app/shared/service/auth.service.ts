import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {User} from "../interfaces/user";
import {AlertService} from "./alert.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    public alertService: AlertService,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.setLoginStatus(true);
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        this.setLoginStatus(false);
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.setUserData(result.user).then(() => console.log('done!'));
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/account/view']).then(() => console.log('done!'));
          }
        });
      })
      .catch((error) => {
        this.alertService.showAlert('Error', null, error.message);
      });
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.sendVerificationMail().then(() => {
          this.router.navigate(['/account/verify-email']).then(() => console.log('done!'));
        });
        this.setUserData(result.user).then(() => console.log('done!'));
        this.alertService.showAlert('Success', 'Sign-up success.', "User successfully created.").then(() => console.log('done!'));
      })
      .catch((error) => {
        this.alertService.showAlert('Error', 'Sign-up error.', error.message).then(() => console.log('done!'));
      });
  }

  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification());
  }

  forgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false;
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      this.router.navigate(['dashboard']).then(() => console.log('done!'));
    });
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']).then(() => console.log('done!'));
        this.setUserData(result.user).then(() => console.log('done!'));
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    this.setLoginStatus(true);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      this.setLoginStatus(false);
      localStorage.removeItem('user');
      this.router.navigate(['/auth/sign-in']).then(() => console.log('done!'));
    });
  }

  getLoginStatus():Observable<boolean>{
    return this.loggedIn;
  }

  setLoginStatus(data:boolean) {
    this.loggedIn.next(data);
  }
}
