import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrimComponent } from './trim.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TrimComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: TrimComponent
      }
    ]),
    TranslateModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class TrimModule { }
