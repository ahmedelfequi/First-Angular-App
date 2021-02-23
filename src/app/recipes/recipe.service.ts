import { Injectable, EventEmitter } from "@angular/core";
import { Subject } from 'rxjs/Subject';

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { shoppingListService } from '../shopping-list/shoppingList.service';

@Injectable()
export class recipeService {
    recipeChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'Koshari', 
    //         'Delicious Egyptian Koshari', 
    //         'https://fustany.com/images/ar/content/header_image_Egyptian-Koshari-Recipe-AR-Main-Image-Fustany.png',
    //         [new Ingredient('Rice', 3),
    //          new Ingredient('Pasta', 2),
    //          new Ingredient('Onion', 4),
    //          new Ingredient('Chickpea', 1)]),
    //     new Recipe(
    //         'Molokhia', 
    //         'Egyptian Molokhia Soup', 
    //         'https://i.ytimg.com/vi/IE5_FcLzhGk/maxresdefault.jpg',
    //         [new Ingredient('Molokhia Plant', 40),
    //         new Ingredient('garlic', 5)])
    //   ];

    private recipes: Recipe[] = [];

      constructor(private shoppingListService: shoppingListService){
      }

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipeChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      onAddedIngredientsToShoppingList(ingredients: Ingredient[]){
          this.shoppingListService.addListOfNewIngredients(ingredients);
      }

      getRecipeById(index: number){
          return this.recipes[index];
      }

      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipeChanged.next(this.recipes.slice());
      }

      UpdateRecipe(index: number, newRecipe: Recipe){
          this.recipes[index] = newRecipe;
          this.recipeChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes);
    }
}