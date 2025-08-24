import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorsComponent } from './motors.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstCategoryComponent } from './first-category/first-category.component';
import { SecondCategoryComponent } from './second-category/second-category.component';
import { ThirdCategoryComponent } from './third-category/third-category.component';

@NgModule({
  declarations: [
    MotorsComponent,
    FirstCategoryComponent,
    SecondCategoryComponent,
    ThirdCategoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path:"",
        component: MotorsComponent
      }
    ]),
    NgMaterialModule,
    TranslateModule,
  ]
})
export class MotorsModule { }
