import { Injectable, EventEmitter } from "@angular/core";

import { Subject } from 'rxjs';

import { Ingredient } from "../shared/ingredient.model";

@Injectable()

export class shoppingListService {

    ingredientsUpdated = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

      getIngredients(){
          return this.ingredients.slice();
      }

      getIngredient(index: number){
          return this.ingredients[index];
      }

      addNewIngredient(ingredient: Ingredient){
          this.ingredients.push(ingredient);
          this.ingredientsUpdated.next(this.ingredients.slice());
      }

      addListOfNewIngredients (ingredients: Ingredient[]){
          this.ingredients.push(...ingredients);
          this.ingredientsUpdated.next(this.ingredients.slice());
      }

      updateIngredient(index: number, newIngredient: Ingredient){
          this.ingredients[index] = newIngredient;
          this.ingredientsUpdated.next(this.ingredients);
      }

      deleteIngredient(index: number){
          this.ingredients.splice(index, 1);
          this.ingredientsUpdated.next(this.ingredients.slice());
      }
}