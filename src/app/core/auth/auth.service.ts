import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { UserService } from 'app/core/user/user.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import moment from 'moment';

import { AngularFireFunctions } from '@angular/fire/compat/functions';

import { _FirebaseError } from '../Utils/Enums/FirebaseErrors.enum';

import { Router } from '@angular/router';



@Injectable()
export class AuthService {
    _authenticated: boolean = false;

    codes = []

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private auth: AngularFireAuth,
        private db: AngularFirestore,
        private fn:AngularFireFunctions,
        private router:Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string) {
      
        return this.auth.sendPasswordResetEmail(email)


    }

    /**
     * Reset password
     *
     * @param password
     */
    async resetPassword(password: string) {



        return (await this.auth.currentUser).updatePassword(password)
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    async signIn(uid) {
        // Throw error, if the user is already logged in
        if (this._authenticated) {
            return throwError('User is already logged in.');
        }


        this._authenticated = true;

        this.accessToken = uid

        await this._userService.getData(uid)

    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        debugger
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {
                debugger
                // Store the access token in the local storage
                this.accessToken = response.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
       
           this.auth.signOut().then(res => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            
            this._userService.user.next(null)
            this._authenticated = false;

            this.router.navigate(['/home'])

            

           }).catch(err => console.log(err))

        // Set the authenticated flag to false
       

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user) {
        let promise = new Promise<any>( (resolve, reject) => {
            

            this.auth.createUserWithEmailAndPassword(user.email , user.password).then(async(res) => {
               
                delete user['password']
                delete user['rePassword']

                user.id =  res.user.uid
          
                user.birthDate = user.birthDate.toDate()

              await  this.db.collection("users").doc(user.id).set({...user})


                this._userService.getData(user.id).then(uRes => {
                    this.accessToken = user.id
                    resolve(uRes)
                })

            }).catch((err) => reject(err))

        })

        return promise



    }



  
    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {

        // Check the access token availability
        if (this.accessToken) {
            return of(true);
        }


        // If the access token exists and it didn't expire, sign in using it
        return of(false);
    }


}
