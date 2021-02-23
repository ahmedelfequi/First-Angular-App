import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { recipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() myRecipe: Recipe;
  @Input() recipeIndex: number;

  constructor(private recipeService: recipeService) { }

  ngOnInit() {
  }
  
}
