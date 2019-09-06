import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

const API_KEY="AIzaSyDBRaQKFHGxRw9OQbuoP3ALPVHINNXUnWw";

export interface UserData{
    idToken: string	//A Firebase Auth ID token for the authenticated user.
    email: string	//The email for the authenticated user.
    refreshToken: string	//A Firebase Auth refresh token for the authenticated user.
    expiresIn: string	//The number of seconds in which the ID token expires.
    localId: string	//The uid of the authenticated user.
    registered?: boolean	//Whether the email is for an existing account.
}

@Injectable()
export class AuthService{

    constructor(private http: HttpClient){}

    login(email: string, password: string){
        return this.http.post<UserData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+API_KEY,
            { email: email, password: password, returnSecureToken: true})
        .pipe(catchError(this.handleError));  
    }

    signUp(email: string, password: string){
        return this.http.post<UserData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+API_KEY,
            { email: email, password: password, returnSecureToken: true})
            .pipe(catchError(this.handleError));
    }

    handleError(errorRes: HttpErrorResponse){
        let errMsg = "An unknown error occured! :O";
        if (!errorRes.error.error || !errorRes.error){
            return throwError(errMsg);
        }
        switch (errorRes.error.error.message){
            case 'EMAIL_NOT_FOUND': 
                errMsg="There is no user record corresponding to this identifier. The user may have been deleted."
                break;
            case 'INVALID_PASSWORD':
                errMsg="The password is invalid or the user does not have a password.";
                break;
            case 'EMAIL_EXISTS': 
                errMsg="The email address is already in use by another account."
                break;    
        }
        return throwError(errMsg);
    }
}