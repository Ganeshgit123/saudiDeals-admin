import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotorSubsriiptionComponent } from './motor-subsriiption.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    MotorSubsriiptionComponent
  ],
  imports: [
    CommonModule,
    AngularEditorModule,
    RouterModule.forChild([
      {
        path:"",
        component: MotorSubsriiptionComponent
      }
    ]),
    NgMaterialModule,
    TranslateModule,
    FormsModule, 
    ReactiveFormsModule,
  ]
})
export class MotorSubsriiptionModule { }
