import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {NgxPermissionsService} from 'ngx-permissions';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirebaseAuth} from '@angular/fire';
import {BehaviorSubject, from, Observable, of, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {firestore, User} from 'firebase/app';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserRequest, UserResponse} from '../models/user.model';

@Injectable()
export class AuthService {

  private _auth: FirebaseAuth;
  private _currentUser$ = new BehaviorSubject(null);

  constructor(
    private _http: HttpClient,
    private _fireAuth: AngularFireAuth,
    private _permissions: NgxPermissionsService,
    private _db: AngularFirestore) {
    this._auth = this._fireAuth.auth;
  }

  get currentUser(): Observable<UserResponse> {
    return this._currentUser$.asObservable();
  }

  get isLoggedIn(): Observable<boolean> {
    return this._fireAuth.authState
      .pipe(
        map((user: User | null) => !!user)
      );
  }

  getCurrentUser(): Observable<UserResponse | null> {
    return this._fireAuth.authState
      .pipe(
        switchMap((user: User | null) => {
          if (user && user.uid) {
            return this._db.collection('users').doc(user.uid).get();
          }
          return of(null);
        }),
        map((snap: firestore.DocumentSnapshot | null) => {
          if (snap && typeof snap.data === 'function') {
            const user = snap.data();
            this._permissions.flushPermissions();
            this._permissions.loadPermissions([user.role]);
            this._currentUser$.next(user);
          }
          return this._currentUser$.getValue();
        }),
        catchError((err: any) => throwError(new Error(err))),
      );
  }

  register(body: UserRequest): Observable<UserResponse> {
    return this._http.post<UserResponse>(`${environment.apiUrl}/createUser`, body)
      .pipe(
        catchError((err: any) => throwError(new Error(err))),
      );
  }

  login(email: string, password: string): Observable<UserResponse> {
    return from(this._auth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap(() => this.getCurrentUser())
      );
  }

  logout(): Observable<void> {
    this._permissions.flushPermissions();
    this._currentUser$.next(null);
    return from(this._auth.signOut());
  }

  resetPassword(email: string): Observable<void> {
    return from(this._auth.sendPasswordResetEmail(email));
  }
}
