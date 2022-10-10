import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';


const exampleRoutes: Route[] = [
  {
      path     : '',
      component: HomeComponent
  }
 
];


@NgModule({
  imports: [
    RouterModule.forChild(exampleRoutes),
    SharedModule,
    MatButtonModule,
    MatIconModule,
    FuseScrollbarModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
