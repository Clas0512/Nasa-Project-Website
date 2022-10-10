import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-focusMode',
  templateUrl: './focusMode.component.html',
  styleUrls: ['./focusMode.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FocusModeComponent implements OnInit {

  content

  constructor(
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    
   }

  ngOnInit() {
    this.content = this.data
  }

}
