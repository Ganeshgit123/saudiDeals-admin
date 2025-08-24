import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelsComponent } from './models.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BikeModelComponent } from './bike-model/bike-model.component';
import { CarModelComponent } from './car-model/car-model.component';

@NgModule({
  declarations: [ModelsComponent, BikeModelComponent, CarModelComponent],
  imports: [
    CommonModule,
    NgMaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: ModelsComponent
      },
      {
        path: "",
        component: CarModelComponent
      },
      {
        path: "",
        component: BikeModelComponent
      }
    ]),
    TranslateModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class ModelsModule { }
