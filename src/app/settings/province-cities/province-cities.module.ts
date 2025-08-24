import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProvinceCitiesComponent } from './province-cities.component';
import { ProvinceComponent } from './province/province.component';
import { CitiesComponent } from './cities/cities.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgMaterialModule } from '../../ng-material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProvinceCitiesComponent,
    ProvinceComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    RouterModule.forChild([
      {
        path: "",
        component: ProvinceCitiesComponent
      },
      {
        path: "",
        component: ProvinceComponent
      },
      {
        path: "",
        component: CitiesComponent
      }
    ]),
    TranslateModule,
    FormsModule, ReactiveFormsModule,
  ]
})
export class ProvinceCitiesModule { }
