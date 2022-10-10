import { isDevMode, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import { REGION } from '@angular/fire/compat/functions';
import { Overlay, BlockScrollStrategy } from '@angular/cdk/overlay';
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { DatePipe, registerLocaleData } from '@angular/common';

import localeTr from '@angular/common/locales/tr';
import localeEn from '@angular/common/locales/en';
import moment from 'moment';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'environments/environment';
import { LoaderComponent } from './layout/common/loader/loader.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AngularFireRemoteConfigModule, SETTINGS } from '@angular/fire/compat/remote-config';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SharedModule } from './shared/shared.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

//declare var gapi:any

//debugger
registerLocaleData(localeTr)
registerLocaleData(localeEn)
moment.locale('tr')


const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

export function scrollFactory(overlay: Overlay): () => BlockScrollStrategy {
    return () =>{ 
       // debugger
        return overlay.scrollStrategies.block();}
  }

  
  export const options: Partial<IConfig>  = {
    validation : false
    }



@NgModule({
    declarations: [
        AppComponent,
        LoaderComponent
        
    ],
    imports     : [
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

     
        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
    

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),

        AngularFireModule.initializeApp(environment.spacegrid ),
        
        AngularFireRemoteConfigModule,
        AngularFireDatabaseModule,
        
        NgxMaskModule.forRoot(options),
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        { provide: REGION, useValue: 'europe-west1' },
        {provide: LOCALE_ID , useValue: "tr-TR"},
        { provide: MAT_SELECT_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] },
        {
            provide: SETTINGS,
            useFactory: () => isDevMode() ? { minimumFetchIntervalMillis: 10_000 } : {}
          },
          {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {backdropClass: ['bg-black' , 'opacity-80'] ,hasBackdrop: true}}
    ]
})

export class AppModule
{
    constructor(){
     //   console.log(localeTr)
       // debugger
    }
}

