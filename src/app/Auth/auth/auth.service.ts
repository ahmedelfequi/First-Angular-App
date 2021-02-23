import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { Subject } from "rxjs/internal/Subject";
import { catchError, tap } from "rxjs/operators";
import { User } from "./User.model";


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})

export class authService {

    private tokenExpirationTimer: any;

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router){}

    SignUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrBioi6McJlXsA9HqwzHIYCqRr8N8oC74',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(resData.email,
                                          resData.localId,
                                          resData.idToken,
                                          +resData.expiresIn)
            }));
    }

    Login(email: string, password: string){
        return this.http
            .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrBioi6McJlXsA9HqwzHIYCqRr8N8oC74',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe(
                catchError(this.handleError),
                tap(resData => {
                    this.handleAuthentication(resData.email,
                                              resData.localId,
                                              resData.idToken,
                                              +resData.expiresIn)
                }));

    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email, 
                                    userData.id,
                                    userData._token,
                                    new Date(userData._tokenExpirationDate));

        
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expDate); 
        }
    }

    Logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }

        this.tokenExpirationTimer = null;
    }
    

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.Logout();
        }, expirationDuration);
    }


    // Get User Data
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number)
    {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);

        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(resError: HttpErrorResponse){
            let errorMessage = 'Unknown Error Occurred';

            if (!resError.error || !resError.error.error){
                return throwError(errorMessage);
            }

            switch (resError.error.error.message){
                case 'EMAIL_EXISTS' :
                    errorMessage = 'This Email Already Exists!';
                break;

                case 'EMAIL_NOT_FOUND' :
                    errorMessage = "This User Doesn't Exist !";
                break;

                case 'INVALID_PASSWORD' :
                    errorMessage = 'Invalid Password !';
                break;
            }

            return throwError(errorMessage);
    }
}