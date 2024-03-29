import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    LoaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    RouterModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    NotFoundComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
