import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyPostDetailsComponent } from './property-post-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PropertyPostDetailsComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: PropertyPostDetailsComponent
      }
    ]),
    TranslateModule,
  ]
})
export class PropertyPostDetailsModule { }
