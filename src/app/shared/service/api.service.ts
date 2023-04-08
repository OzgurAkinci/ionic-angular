import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {environment} from "../../../environments/environment";
import { Preferences } from '@capacitor/preferences';

const ACCESS_TOKEN_KEY = 'my-access-token';
const REFRESH_TOKEN_KEY = 'my-refresh-token';
const USER_KEY = 'my-user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  currentAccessToken = null;
  currentUser = null;
  url = environment.api_url;

  constructor(private http: HttpClient, private router: Router) {
    this.loadToken();
  }

  // Load accessToken on startup
  async loadToken() {
    const token = await Preferences.get({ key: ACCESS_TOKEN_KEY });
    const user = await Preferences.get({ key: USER_KEY });
    if (token && token.value && user) {
      this.currentAccessToken = token.value;
      this.currentUser = JSON.parse(user.value);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // Get our secret protected data
  getSecretData() {
    return this.http.get(`${this.url}/users/secret`);
  }

  // Create new user
  signUp(credentials: {username, password}): Observable<any> {
    return this.http.post(`${this.url}/users`, credentials);
  }

  // Sign in a user and store access and refres token
  login(credentials: {username, password}): Observable<any> {
    return this.http.post(`${this.url}/auth/signin`, credentials).pipe(
      switchMap((tokens: {accessToken, refreshToken, user }) => {
        this.currentAccessToken = tokens.accessToken;
        const storeAccess = Preferences.set({key: ACCESS_TOKEN_KEY, value: tokens.accessToken});
        const storeRefresh = Preferences.set({key: REFRESH_TOKEN_KEY, value: tokens.refreshToken});
        const storeUser = Preferences.set({key: USER_KEY, value: JSON.stringify(tokens.user)});
        return from(Promise.all([storeAccess, storeRefresh, storeUser]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  // Potentially perform a logout operation inside your API
// or simply remove all local tokens and navigate to login
  logout() {
    return this.http.post(`${this.url}/auth/signout`, {}).pipe(
      switchMap(_ => {
        this.currentAccessToken = null;
        // Remove all stored tokens
        const deleteAccess = Preferences.remove({ key: ACCESS_TOKEN_KEY });
        const deleteRefresh = Preferences.remove({ key: REFRESH_TOKEN_KEY });
        return from(Promise.all([deleteAccess, deleteRefresh]));
      }),
      tap(_ => {
        this.isAuthenticated.next(false);
        this.router.navigateByUrl('/', { replaceUrl: true });
      })
    ).subscribe();
  }

  // Load the refresh token from storage
  // then attach it as the header for one specific API call
  getNewAccessToken() {
    const refreshToken = from(Preferences.get({ key: REFRESH_TOKEN_KEY }));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token.value) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token.value}`
            })
          }
          return this.http.get(`${this.url}/auth/refresh`, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  // Store a new access token
  storeAccessToken(accessToken) {
    this.currentAccessToken = accessToken;
    return from(Preferences.set({ key: ACCESS_TOKEN_KEY, value: accessToken }));
  }
}
