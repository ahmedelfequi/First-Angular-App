import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { recipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeToDisplayDetails: Recipe;
  recipeIndex: number;
  isRecipeChoosen: boolean = false;

  
  constructor(private recipeService: recipeService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.recipeIndex = params['id']-1;
        this.recipeToDisplayDetails = this.recipeService.getRecipeById(this.recipeIndex);
      if (this.recipeIndex >= 0){
        this.isRecipeChoosen = true;
      }
      }
    )

  }

  onAddingIngredientsToShoppingList(){
    this.recipeService.onAddedIngredientsToShoppingList(this.recipeToDisplayDetails.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeIndex);
    this.router.navigate(['/recipes']);
  }
}
