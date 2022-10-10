import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector     : 'empty-layout',
    templateUrl  : './empty.component.html',
    encapsulation: ViewEncapsulation.None
})
export class EmptyLayoutComponent implements OnDestroy , OnInit
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    showHeader = true

    /**
     * Constructor
     */
     constructor(
        router:Router,
        private activatedRoute:ActivatedRoute
        ) {
        
            
            this.activatedRoute.data.subscribe(res => {

                if (res.signUp) {
                    this.showHeader = false
                }else{
                    this.showHeader = true
                }

            })
      }
 
    ngOnInit(): void {
      
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
