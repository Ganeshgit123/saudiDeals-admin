import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorsComponent } from './motors.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MotorsComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: MotorsComponent
      }
    ]),
    TranslateModule,
  ]
})
export class MotorsModule { }
