import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import {AngularFireStorage} from '@angular/fire/compat/storage'

import { _FirebaseError } from 'app/core/Utils/Enums/FirebaseErrors.enum';


@Component({
    selector     : 'classy-layout',
    templateUrl  : './classy.component.html',
    styles:     ['.yns-emre { background-image: url("./yns.jpg");background-repeat: repeat;}'],


})
export class ClassyLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: Navigation = {compact: [] ,default: [] ,futuristic:[],horizontal:[]}
    user:any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    footerLogoUrl= ''

    players= []
    selectedPlayer
    selectedSchool

    /**
     * Constructor
     */
    constructor(
        private _navigationService: NavigationService,
        private _userService: UserService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private stroge:AngularFireStorage,
        // private playerService:PlayerService,
        // private schoolService:SchoolService
    )
    {
        // this.schoolService.selectedSchool.subscribe(school =>{ 
        //     debugger
        //     console.log(school)
        //     school ? this.selectedSchool = school : null
        //     school?.imgUrl ? this.footerLogoUrl = school.imgUrl :  this.footerLogoUrl = 'assets/images/logo/logo-text.svg'
        
        // })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        // Subscribe to navigation data
        this._navigationService.get()
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
            //    debugger
               this._navigationService.navigation$.subscribe(data => this.navigation = data)
               // //console.log(this.navigation)
            });

        // Subscribe to the user service
        this._userService.user
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user) => {
                if (!user) {
                    return
                }
           //     console.log(user)
                this.user = user;
     
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });

        

 

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
       
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        // this.playerService.selectedPlayer.next(null)
        // this.playerService.selectedPlayer.complete()
        this.selectedPlayer = null
    }
    test(e){
        console.log(e)
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
