import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService, UserData } from "./auth.service";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'auth',
    templateUrl: "./auth.component.html" 
})
export class AuthComponent{
    isLogin = true;
    isLoading = false;
    error = null;
    errorMsg: string;
    user = new BehaviorSubject<UserData>(null);

    constructor(private authService: AuthService, private route: Router){}

    toggleBtn(){
        this.isLogin = !this.isLogin;
    }

    login(email: string, password: string){
        this.isLoading = true;
        this.authService.login(email, password)
        .subscribe(
            (userData)=>{
                this.error=null;
                localStorage.setItem('userData',JSON.stringify(userData));
                this.isLoading = false;
                this.route.navigateByUrl("/recipes");
            },
            (err)=>{
                this.errorMsg = err;
                this.isLoading = false;
            }
        );
    }

    signup(email: string, password: string){
        this.isLoading = true;
        this.authService.signUp(email, password)
        .subscribe(
            (userData)=>{
                console.log(userData);
                this.error=null;
                this.isLoading = false;
            },
            (err)=>{
                this.errorMsg = err;
                this.isLoading = false;
            }
        );     
    }

    authBtn(authForm: NgForm){
        var formValues = authForm.form.value;
        this.isLogin ? this.login(formValues.email, formValues.password) 
            : this.signup(formValues.email, formValues.password);
        authForm.reset();
    }
}