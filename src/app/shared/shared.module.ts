import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { dropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { placeholderDirective } from "./placehoder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        dropdownDirective,
        LoadingSpinnerComponent,
        placeholderDirective
    ],
    imports: [CommonModule],
    exports: [
        CommonModule,
        AlertComponent,
        dropdownDirective,
        LoadingSpinnerComponent,
        placeholderDirective
    ]
})

export class SharedModule { }