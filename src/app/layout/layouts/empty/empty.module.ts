import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutComponent } from 'app/layout/layouts/empty/empty.component';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { SearchModule } from 'app/layout/common/search/search.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { FuseNavigationModule } from '@fuse/components/navigation';

@NgModule({
    declarations: [
        EmptyLayoutComponent,
        HeaderComponent
    ],
    imports     : [
        RouterModule,
        SharedModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        FuseNavigationModule,
    ],
    exports     : [
        EmptyLayoutComponent
    ]
})
export class EmptyLayoutModule
{
}
