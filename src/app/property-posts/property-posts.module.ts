import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyPostsComponent } from './property-posts.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PropertyPostsComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: PropertyPostsComponent
      }
    ]),
    TranslateModule,
  ]
})
export class PropertyPostsModule { }
