import { authService } from './../Auth/auth/auth.service';
import { recipeService } from './../recipes/recipe.service';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/internal/operators/take';
import { exhaustMap } from 'rxjs/internal/operators/exhaustMap';

@Injectable({providedIn: 'root'})

export class dataStorageService {
    constructor(private http: HttpClient,
                private recipeService: recipeService,
                private authService: authService){}

    storeRecipes(){
        this.http.put('https://angular-recipe-book-2da84.firebaseio.com/recipes.json', 
                       this.recipeService.getRecipes())

                       .subscribe(response => {
                           console.log(response);
                       });
    }

    getRecipes(){
        
        this.http.get<Recipe[]>('https://angular-recipe-book-2da84.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    })
                })).subscribe(response => {
                    this.recipeService.setRecipes(response);
                });
    }
}