import { SharedModule } from 'src/app/shared/shared.module';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [AuthComponent],
    imports: [
              SharedModule,
              RouterModule.forChild([{ path: '', component: AuthComponent}]),
              FormsModule
             ],

})

export class AuthModule {  }