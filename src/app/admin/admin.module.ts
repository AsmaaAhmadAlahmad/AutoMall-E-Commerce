import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';
import {  NgForm } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    // CategoriesComponent,
    // DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class AdminModule { }
