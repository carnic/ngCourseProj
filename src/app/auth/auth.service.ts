import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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
        
    }

    signUp(email: string, password: string){
        return this.http.post<UserData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+API_KEY,
            { email: email, password: password, returnSecureToken: true})
        
    }
}