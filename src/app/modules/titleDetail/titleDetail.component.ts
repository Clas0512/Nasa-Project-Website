import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataEngineService } from 'app/core/dataEngine/dataEngine.service';
import { FocusModeComponent } from './focusMode/focusMode.component';

@Component({
  selector: 'app-titleDetail',
  templateUrl: './titleDetail.component.html',
  styleUrls: ['./titleDetail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TitleDetailComponent implements OnInit {


  feed
  focusMode = false
  focusDialog

  constructor(
    private dataEngine: DataEngineService,
    private activatedRouter:ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog,

  ) { }


  ngOnInit() {



    this.dataEngine.feed.subscribe((data) => {
      
      if(data){

        this.feed = (data)
      }else{
        
        this.activatedRouter.params.subscribe((params) => {
          
          this.dataEngine.findFeed(params.title).subscribe((feed) => {
            if(feed){
              this.feed = feed
              console.log(this.feed)
            }
           
          })
        })

      }


      

    })
  }



  toggleFocus(e){
    
    if (this.focusDialog){
      this.focusMode =false
      this.focusDialog.close()
    }else{
      this.focusMode =true

      this.focusDialog = this.dialog.open(FocusModeComponent, {
        data: this.feed,
        panelClass: ['vw-80', 'overflow-auto']
        
   
      });
      this.focusDialog.afterClosed().subscribe(result => {
        this.focusDialog = null
        this.focusMode = false
      }
      )
    }
    



  }

}
