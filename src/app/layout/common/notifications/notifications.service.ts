import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, ReplaySubject } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { finalize, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'app/core/user/user.service';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { LoaderService } from '../loader/loader.service';
import { reject } from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    private _notifications: ReplaySubject<Notification[]> = new ReplaySubject<any[]>(1);
    user:any
    player
    /**
     * Constructor
     */
   constructor(
        private _httpClient: HttpClient,
        private db:AngularFirestore,
        private fn:AngularFireFunctions,
        private loader:LoaderService,
        private userService:UserService
        )
    {
    this.user = JSON.parse( localStorage.getItem("user"))
    this.player = JSON.parse( localStorage.getItem("selectedPlayer"))
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
     notifications$(playerId)
    {
        
        return this.db.collection("notifications").ref.where("playerID" , '==' , playerId).limit(10).orderBy("created" ).get()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all notifications
     */
    getAll(playerId)
    {
      return this.db.collection("notifications").ref.where("playerID" , "==" , playerId).orderBy("created" , "desc").orderBy("notifcationStatusID").get()
    }
    getSendNotifications(){
  
        this.loader.loading$.next(true)

        let promise = new Promise((resolve , reject ) => {

            try {
                this.db.collection("notifications").ref.where("senderID", "==", this.user.id ).get().then(async ref => {


                    let sendNotifications = ref.docs.map(t => t.data())
                    for (let index = 0; index < sendNotifications.length; index++) {
                        const element:any = sendNotifications[index];
            
                        let player =  (await this.db.collection("players").doc(element.playerID).get().toPromise()).data()
            
                        element.player = player
            
                    }
    
                    resolve(sendNotifications)
                    this.loader.loading$.next(false)
        
        
                })
            } catch (error) {
        this.loader.loading$.next(false)
                
            }
     
     
        })

        return promise

  
        // return  this.fn.httpsCallable("getSendNotifications")(this.user.id).pipe(
        //     finalize(() => this.loader.loading$.next(false))
        // )
         
   
        
            //.db.collection('notifications').ref

     
    }

    /**
     * Create a notification
     *
     * @param notification
     */
    create(notification)
    {
        this.loader.loading$.next(true)
        notification.senderID = this.user.id

        return this.fn.httpsCallable("addNotification")(notification).pipe(
   
            finalize(() => {
                this.loader.loading$.next(false)
            })
            
            )
        
    }

    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    update(id: string)
    {
        

        return this.db.collection("notifications").doc(id).update({notifcationStatusID: 1})
    }

    /**
     * Delete the notification
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        // return this.notifications$.pipe(
        //     take(1),
        //     switchMap(notifications => this._httpClient.delete<boolean>('api/common/notifications', {params: {id}}).pipe(
        //         map((isDeleted: boolean) => {

        //             // Find the index of the deleted notification
        //             const index = notifications.findIndex(item => item.id === id);

        //             // Delete the notification
        //             notifications.splice(index, 1);

        //             // Update the notifications
        //             this._notifications.next(notifications);

        //             // Return the deleted status
        //             return isDeleted;
        //         })
        //     ))
        // );
        return
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(notifications:any[]): Observable<boolean>
    {
        try {
            notifications.forEach( async t => {
                await this.db.collection("notifications").doc(t.id).update({notifcationStatusID : 1})
            })
            return of(true)
        } catch (error) {
            return of(error)
        }
    
      
    }
}
