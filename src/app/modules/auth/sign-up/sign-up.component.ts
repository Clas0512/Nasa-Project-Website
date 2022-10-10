import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/core/user/user.service';
import { topics } from 'app/core/Utils/datas';
import { _FirebaseError } from 'app/core/Utils/Enums/FirebaseErrors.enum';

import notify from 'devextreme/ui/notify';
import { cloneDeep } from 'lodash';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
  
    animations: fuseAnimations,
  

})
export class AuthSignUpComponent implements OnInit , AfterViewInit  {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string , data?:any } = {
        type: 'success',
        message: '',
        data:{}
    };
    signInForm: FormGroup;

    passwordForm: FormGroup;
    showAlert: boolean = false;

    codeVerified = false
    
    topics = topics
    userTopics = []

    singignUp = false
    user

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private auth: AngularFireAuth,
        private _formBuilder: FormBuilder,
        private userService:UserService,
        private router:Router


    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {


        this.buildForm()
   



    }
    ngAfterViewInit(){
      
    }
    ngOnChanges(e){
        console.log(e)
    }


    buildForm(){
        this.signInForm = this._formBuilder.group({
            username: ['' , Validators.required],
            email : ['' , [Validators.required , Validators.email]],
            password: ['' , Validators.required],
            rePassword: ['' , Validators.required],
            fullname: ['' , Validators.required],
            birthDate: [ '' ,Validators.required],
            job: [ '' ,Validators.required],
            education: [ '' ,Validators.required],


        }  ,{
            validators: FuseValidators.mustMatch('password', 'rePassword')
        })
    }

    signUp(){

        this.showAlert = false
        let data = this.signInForm.value

        this._authService.signUp(data).then(res => {
            this.user = res
            this.singignUp = true
        }).catch(err => {
           this.showAlert = true
            this.alert = {
                type: 'error',
                message: err.message,
              
            };
        })

    }

    isTopicSelected(topic){

        
        let q = this.userTopics.find(t => t.id == topic.id)
        if(q){
           
            return true
        }
        return false

    }

    test(e?){
        if (e) {
            console.log(e)
        }else{
            console.log(this.userTopics) 
            console.log(this.topics) 

        }
    }
    addOrDeleteTopic(topic){
        

        let index = this.userTopics.indexOf(topic)
        

        if (index == -1) {

      
         
            this.userTopics.push(topic)
        }else{
           
      
            this.userTopics.splice(index , 1)
        }
        

    }

    saveTopics(){
        this.userService.updateTopics(this.user.id , this.userTopics).then(() => {

            this._authService._authenticated = true
            this.router.navigateByUrl("/home")


        })
    }
 

}
