import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { authInterceptorService } from "./Auth/auth/auth-Interceptor.service";
import { recipeService } from "./recipes/recipe.service";
import { shoppingListService } from "./shopping-list/shoppingList.service";

@NgModule({
    providers: [shoppingListService, 
                recipeService, {
                    provide: HTTP_INTERCEPTORS,
                    useClass: authInterceptorService,
                    multi: true
                                }
    ]
})

export class CoreModule { }