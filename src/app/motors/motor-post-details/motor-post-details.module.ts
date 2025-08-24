import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorPostDetailsComponent } from './motor-post-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MotorPostDetailsComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: MotorPostDetailsComponent
      }
    ]),
    TranslateModule,
  ]
})
export class MotorPostDetailsModule { }
