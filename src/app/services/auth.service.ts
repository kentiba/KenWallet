import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private afauth: AngularFireAuth) {}

    login(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afauth.auth
                .signInWithEmailAndPassword(email, password)
                .then(userData => resolve(userData), err => reject(err));
        });
    }

    register(email: string, password: string) {
        return new Promise((resolve, reject) => {
            this.afauth.auth
                .createUserWithEmailAndPassword(email, password)
                .then(userdata => resolve(userdata), err => reject(err));
        });
    }

    getAuth() {
        return this.afauth.authState.pipe(auth => auth);
    }

    logOut() {
        return this.afauth.auth.signOut();
    }
}
