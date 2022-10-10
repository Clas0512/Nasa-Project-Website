import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleDetailComponent } from './titleDetail.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';


const exampleRoutes: Route[] = [
  {
      path     : '',
      component: TitleDetailComponent
  }
 
];


@NgModule({
  imports: [
    RouterModule.forChild(exampleRoutes),
    SharedModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [TitleDetailComponent]
})
export class TitleDetailModule { }
