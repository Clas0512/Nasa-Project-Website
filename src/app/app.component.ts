import { Component } from '@angular/core';



import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { environment } from 'environments/environment';
import { DataEngineService } from './core/dataEngine/dataEngine.service';
import { read } from 'feed-reader'

import fetch from 'node-fetch';
import { HttpClient, HttpRequest } from '@angular/common/http';
//npm i feed-reader

declare var gapi: any;


@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    /**
     * Constructor
     */
    constructor(
        private userService:UserService,
        private authService:AuthService,
        private dataService:DataEngineService,
        private http: HttpClient
    )
    {

        // this.http.get('https://api.rss2json.com/v1/api.json?rss_url=https://evrimagaci.org/rss.xml' ).subscribe((data:any) => {
        //     console.log(data.items[0].content)
        // })

        // Set the defaultst

     
       
        this.dataService.getRssFeed().subscribe()
     
// debugger
       if (authService.accessToken) {
        userService.getData(authService.accessToken)
        
        
    }
}


}
