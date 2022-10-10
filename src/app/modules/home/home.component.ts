import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { FuseScrollbarDirective } from '@fuse/directives/scrollbar';
import { DataEngineService } from 'app/core/dataEngine/dataEngine.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  allFeeds = []
  mostRecentFeed = []

  constructor(
    private dataEngine: DataEngineService,
    private router:Router
   
  ) { }

  ngOnInit() {
    this.dataEngine.get().subscribe((data) => {
      this.allFeeds = data
   
    } )

    this.dataEngine.getMostRecentFeed().subscribe((data) => {
      this.mostRecentFeed = data
      console.log('home', data)
    }
    )
  }

  readMore(feed) {
    this.dataEngine.saveFeed(feed)
    this.router.navigateByUrl('/home/article/' + encodeURIComponent(feed.title) )
  }
 
  saveBookmark(feed) {
    
  }


 



}
