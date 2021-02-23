import { placeholderDirective } from './../../shared/placehoder.directive';
import { AlertComponent } from './../../shared/alert/alert.component';
import { authService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(placeholderDirective) alertHost : placeholderDirective;

  private closeSub: Subscription;

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: authService,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }

    const email = form.value.email;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode){
        authObservable = this.authService.Login(email, password);
    }
    else {
        authObservable = this.authService.SignUp(email, password);
    }

    authObservable.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
    }, errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showAlertError(errorMessage);
        this.isLoading = false; 
    });

    form.reset();
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
  }

  showAlertError(error: string){
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertHostViewContainerRef = this.alertHost.viewContainerRef;
    alertHostViewContainerRef.clear();

    const componentRef = alertHostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = error;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      alertHostViewContainerRef.clear();
    })
  }

}
