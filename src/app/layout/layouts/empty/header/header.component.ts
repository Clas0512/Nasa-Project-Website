import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AuthService } from 'app/core/auth/auth.service';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { Navigation } from 'app/core/navigation/navigation.types';
import { UserService } from 'app/core/user/user.service';
import { AuthSignInComponent } from 'app/modules/auth/sign-in/sign-in.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user

  showSearchField = false
  isScreenSmall: boolean;
  navigation: Navigation;


  constructor(
    private dialog:MatDialog,
    private userService:UserService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private authService:AuthService,
    private _navigationService: NavigationService,
    private _fuseNavigationService: FuseNavigationService


  ) { }


  ngOnInit() {
    this.userService.user.subscribe(user => {

      this.user = user


    })
          // Subscribe to navigation data
          this._navigationService.get()
          .subscribe((navigation: Navigation) => {
              this.navigation = navigation;
          });

    this._fuseMediaWatcherService.onMediaChange$
    .subscribe(({matchingAliases}) => {

        // Check if the screen is small
        this.isScreenSmall = !matchingAliases.includes('md');
    });
}

toggleNavigation(name: string): void
{
    // Get the navigation
    const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

    if ( navigation )
    {
        // Toggle the opened status
        navigation.toggle();
    }
}

  

  login(){
    this.dialog.open(AuthSignInComponent)
  }

  logout(){
    this.authService.signOut()
  }

}
