import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';
import { AvailableLangs, TranslocoService } from '@ngneat/transloco';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';

import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/date";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/message";

import trMessages from "devextreme/localization/messages/tr.json";
import supplemental from "devextreme-cldr-data/supplemental.json";;
import trCldrData from "devextreme-cldr-data/tr.json";


import Globalize from "globalize";
import { NavigationEnd, Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import moment from 'moment';
import { SessionService } from 'app/Session.service';
@Component({
    selector       : 'languages',
    templateUrl    : './languages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'languages'
})
export class LanguagesComponent implements OnInit, OnDestroy
{
    availableLangs: AvailableLangs;
    activeLang: string;
    flagCodes: any;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseNavigationService: FuseNavigationService,
        private _translocoService: TranslocoService,
        private router:Router,
        private sessionService:SessionService

    )
    {
    }
    test(e){
        //console.log(e)
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the available languages from transloco
        this.availableLangs = this._translocoService.getAvailableLangs();

        // Subscribe to language changes
        this._translocoService.langChanges$.subscribe(async (activeLang) => {

            // Get the active lang
            this.activeLang = activeLang;

            localStorage.setItem("culture" , activeLang +'-' + activeLang.toUpperCase())
            this.sessionService.registerCulture(activeLang).then(() => console.log(new Date().toLocaleString()))


          // debugger

//             var localeLang = await import(  '@angular/common/locales/' + activeLang + ".js");
//             console.log(localeLang)
//             registerLocaleData(localeLang.default)
//   moment.locale(activeLang)


    
            this._updateNavigation(activeLang);
           
           

            // Update the navigation
       
        });

        // Set the country iso codes for languages for flags
        this.flagCodes = {
            'tr': 'tr',
            'en': 'us'
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Set the active lang
     *
     * @param lang
     */
    async setActiveLang(lang: string)
    {
        // Set the active lang
        this._translocoService.setActiveLang(lang);
     

      // debugger

      moment.locale(lang)
 
     Globalize.locale(lang) 
    // this._changeDetectorRef.detectChanges()
     let currentUrl = this.router.url;
         //this.router.onSameUrlNavigation = 'reload';
     this.router.navigate(['']).then( t =>  this.router.navigate([currentUrl]) )

//    let currentUrl = this.router.url;
//    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
//    this.router.onSameUrlNavigation = 'reload';
//    this.router.navigate([currentUrl]);
    
    //     var langCldrData: any = await  import("devextreme-cldr-data/"+ lang + ".json");
      

    //     await Globalize.load(
    //         supplemental,  langCldrData.main
    //     );
    //   await Globalize.loadMessages(langMessages[lang]);
    //   await Globalize.locale(lang) 


    //   console.log(Globalize)

    //  
    //  
    //  
    //  

    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Update the navigation
     *
     * @param lang
     * @private
     */
    private _updateNavigation(lang: string): void
    {



     

        // For the demonstration purposes, we will only update the Dashboard names
        // from the navigation but you can do a full swap and change the entire
        // navigation data.
        //
        // You can import the data from a file or request it from your backend,
        // it's up to you.

        // Get the component -> navigation data -> item
        // const navComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');

        // // Return if the navigation component does not exist
        // if ( !navComponent )
        // {
        //     return null;
        // }

        // // Get the flat navigation data
        // const navigation = navComponent.navigation;
        // debugger

        // // Get the Project dashboard item and update its title
        // const projectDashboardItem = this._fuseNavigationService.getItem('classes', navigation);
        // if ( projectDashboardItem )
        // {
        //     this._translocoService.selectTranslate('Project').pipe(take(1))
        //         .subscribe((translation) => {

        //             // Set the title
        //             projectDashboardItem.title = translation;

        //             // Refresh the navigation component
        //             navComponent.refresh();
        //         });
        // }

        // // Get the Analytics dashboard item and update its title
        // const analyticsDashboardItem = this._fuseNavigationService.getItem('team', navigation);
        // if ( analyticsDashboardItem )
        // {
        //     this._translocoService.selectTranslate('Analytics.test').pipe(take(1))
        //         .subscribe((translation) => {

        //             // Set the title
        //             analyticsDashboardItem.title = translation;

        //             // Refresh the navigation component
        //             navComponent.refresh();
        //         });
        // }
    }
}
