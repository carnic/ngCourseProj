import { Component } from "../../../node_modules/@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, UserData } from "./auth.service";
import { BehaviorSubject } from "../../../node_modules/rxjs";

@Component({
    selector: 'auth',
    templateUrl: "./auth.component.html" 
})
export class AuthComponent{
    isLogin = true;
    error = null;
    errorMsg: string;
    user = new BehaviorSubject<UserData>(null);

    constructor(private authService: AuthService){}

    toggleBtn(){
        this.isLogin = !this.isLogin;
    }

    login(email: string, password: string){
        this.authService.login(email, password)
        .subscribe(
            (userData)=>{
                console.log(userData);
                this.error=null;
                localStorage.setItem('userData',JSON.stringify(userData));
            },
            (err)=>{
                console.log(err);
                this.error = err;
                switch (err.error.error.message){
                    case 'EMAIL_NOT_FOUND': 
                        this.errorMsg="There is no user record corresponding to this identifier. The user may have been deleted."
                        break;
                    case 'INVALID_PASSWORD':
                        this.errorMsg="The password is invalid or the user does not have a password.";
                        break;      
                }
            }
        );
    }

    signup(email: string, password: string){
        this.authService.signUp(email, password)
        .subscribe(
            (userData)=>{
                console.log(userData);
                this.error=null;
            },
            (err)=>{
                this.error = err;
                switch (err.error.error.message){
                    case 'EMAIL_EXISTS': this.errorMsg="The email address is already in use by another account."
                        break;
                }
            }
        );     
    }

    authBtn(authForm: NgForm){
        var formValues = authForm.form.value;
        this.isLogin ? this.login(formValues.email, formValues.password) 
            : this.signup(formValues.email, formValues.password);
    }
}