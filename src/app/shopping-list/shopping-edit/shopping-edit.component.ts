import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { shoppingListService } from '../shoppingList.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: shoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  onSumbit(form: NgForm){
    const value = form.value;
    const myIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, myIngredient);
    } else {
      this.shoppingListService.addNewIngredient(myIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClearForm(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
