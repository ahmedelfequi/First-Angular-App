import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // myChoosenRecipe: Recipe;

  constructor() { }

  ngOnInit() {
    // this.recipeSrevice.recipeSelected.subscribe(
    //   (recipe: Recipe) => {
    //     this.myChoosenRecipe = recipe;
    //   }
    // )
  }

}
