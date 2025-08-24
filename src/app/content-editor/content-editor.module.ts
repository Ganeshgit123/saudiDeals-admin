import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentEditorComponent } from './content-editor.component';
import { TermsComponent } from './terms/terms.component';
import { RouterModule } from '@angular/router';
import { NgMaterialModule } from '../ng-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ContentEditorComponent,
    TermsComponent
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    AngularEditorModule,
    RouterModule.forChild([
      {
        path: "",
        component: ContentEditorComponent
      },
      {
        path: "",
        component: TermsComponent
      }
    ]),
  ]
})
export class ContentEditorModule { }
