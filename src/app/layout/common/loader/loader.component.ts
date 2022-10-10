import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public loading$ 


  constructor(private loaderService: LoaderService){
    this.loading$ = this.loaderService.loading$
  }

  ngOnInit() {
  }

}
