import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakesComponent } from './makes.component';
import { CarComponent } from './car/car.component';
import { BikeComponent } from './bike/bike.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CarComponent,
    BikeComponent,
    MakesComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: MakesComponent
      },
      {
        path: "",
        component: CarComponent
      },
      {
        path: "",
        component: BikeComponent
      }
    ]),
    TranslateModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class MakesModule { }
