import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { SafeHTMLPipe } from 'app/core/Utils/Pipes/SafeHTML.pipe';





@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule ,
        TranslocoCoreModule,
        
        
    ],
    declarations:[

        SafeHTMLPipe
   
    ],

    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        TranslocoCoreModule,
        SafeHTMLPipe
      
       
    ]
})
export class SharedModule
{
}
