import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterTrimComponent } from './master-trim.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MasterTrimComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: MasterTrimComponent
      }
    ]),
    TranslateModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class MasterTrimModule { }
