import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { NgModule } from "@angular/core";

import { authGuard } from '../Auth/auth/auth.guard';
import { NoRecipeSelectedComponent } from './no-recipe-selected/no-recipe-selected.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
    {path: '', component: RecipesComponent, canActivate: [authGuard], children: [
        { path: '', component: NoRecipeSelectedComponent, pathMatch: 'full' },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent }
    ] },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule { }