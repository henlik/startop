import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNetComponent } from './add-net/add-net.component';
import { TrackingRoutes } from './tracking.routing';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';



@NgModule({
  declarations: [
    AddNetComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ZXingScannerModule,
    RouterModule.forChild(TrackingRoutes)
  ]
})
export class TrackingModule { }
