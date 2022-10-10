import { Injectable, InjectionToken, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'app/core/user/user.types';
import { AngularFirestore } from '@angular/fire/compat/firestore';



export const USER = new InjectionToken<User>("test" )


@Injectable({
    providedIn: 'root'
})
export class UserService
{
    user: BehaviorSubject<User> = new BehaviorSubject<any>(null);
    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _db:AngularFirestore
        )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user
     *
     * @param value
     */
    // set user(value: User)
    // {
    //     // Store the value
    //   // debugger
    //     Injector.create({providers:[{provide: USER , useValue: value }]})
    //     this._user.next(value);

    // let b = 3
    // }

    // get getUser()(): Observable<User>
    // {
    //     return this._user.asObservable();
    // }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    // get(): Observable<User>
    // {
    //     return this._httpClient.get<User>('api/common/user').pipe(
    //         tap((user) => {
    //             this._user.next(user);
    //         })
    //     );
    // }

    getData(uid){
        let promise =  new Promise((resolve , reject) => {
            this._db.collection("users").doc(uid).get().subscribe(response => {
                //       debugger
                    
                        let a:any = response.data()
                      

                        

                        
               
                      //  console.log(aa)
                        localStorage.setItem("user" , JSON.stringify(a))
            
                        this.user.next(a)
                        resolve(a)
            
                     },err => reject(err));

        })

        return promise
 
    }

    getUser(): Observable<User>{
 
        return this.user.asObservable()
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any>
    {
        return this._httpClient.patch<User>('api/common/user', {user}).pipe(
            map((response) => {
                this.user.next(response);
            })
        );
    }

    updateTopics(id , topics:any[]){

        let arr = []

        topics.forEach((t) => arr.push(t.id) )

        return this._db.collection("users").doc(id).update({
            topics:arr
        })
    }

    
}
