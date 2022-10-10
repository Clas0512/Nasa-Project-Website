import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { _FirebaseError } from 'app/core/Utils/Enums/FirebaseErrors.enum';

import { FirebaseError } from 'firebase/app';




@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;


    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
    corporateLogin = false
    guardLogin = false
    forgetPassword = false
    forgettedEmail = ""
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private auth: AngularFireAuth,
        private snackbar:MatSnackBar,
        private matDialogRef:MatDialogRef<AuthSignInComponent>,
        private userService: UserService

    ) {
        let url = this._router.url

        if (url.includes("corporate")) {
            this.corporateLogin = true
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

       
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
          
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    async signIn() {

        
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;


        const data = this.signInForm.value
        

        

      

        this.auth.signInWithEmailAndPassword(data.email, data.password).then(async res => {

            this.signInForm.enable();
          await  this.userService.getData(res.user.uid)
          this._authService.accessToken = res.user.uid

            // Reset the form
            this.signInNgForm.resetForm();
            console.log("başarılı" ,res)
          
            this.close()
        

        }).catch((err: FirebaseError) => {

            console.log("hata",err)
            debugger
            this.signInForm.enable();

            // Reset the form
            this.signInNgForm.resetForm();

            this.showAlert = true;
            this.alert = {
                type: 'error',
                message: err.message
            };
      


            // Show the alert
          

        })

 
    }


    sendResetPassword(){
        this.auth.sendPasswordResetEmail(this.forgettedEmail).then(() => {
            
            this.snackbar.open("Sended")
            this.close()
        
        })
    }



 gotoURL(url){
       this.close()
       this._router.navigateByUrl(url)
    }
    
    close(){
        this.matDialogRef.close()
    }

}
