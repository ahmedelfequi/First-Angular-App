import { Subscription } from 'rxjs';
import { authService } from './../Auth/auth/auth.service';
import { dataStorageService } from './../shared/dataStorage.service';
import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private dataStorageService: dataStorageService,
              private authService: authService){}

  ngOnInit(){
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveRecipes(){
    this.dataStorageService.storeRecipes();
  }

  onFetchRecipes(){
    this.dataStorageService.getRecipes();
  }

  onLogout(){
    this.authService.Logout();
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}
